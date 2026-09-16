import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import type { FormAnalysis, PaginatedFormAnalyses } from '../types/formAnalysis';

const FORM_ANALYSES_COLLECTION = 'form_analyses';

/**
 * Fetch form analyses for the current user with pagination.
 * @param limitCount Number of analyses to fetch
 * @param lastTimestamp Timestamp to start after (for pagination)
 * @returns Paginated form analyses
 */
export async function fetchFormAnalyses(
  limitCount: number = 10,
  lastTimestamp?: string
): Promise<PaginatedFormAnalyses> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Path: form_analyses/{uid}/form_analyses
    const collectionPath = `${FORM_ANALYSES_COLLECTION}/${user.uid}/${FORM_ANALYSES_COLLECTION}`;
    const collectionRef = collection(db, collectionPath);

    // Build query with limit + 1 to check if there are more
    let q = query(
      collectionRef,
      orderBy('created_at', 'desc'),
      limit(limitCount + 1)
    );

    // If we have a cursor, start after it
    if (lastTimestamp) {
      q = query(q, startAfter(lastTimestamp));
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { data: [], hasMore: false };
    }

    // Parse documents and add IDs
    const allRecords: FormAnalysis[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<FormAnalysis, 'id'>;
      return {
        ...data,
        id: doc.id,
      };
    });

    // Check if there are more documents
    const hasMore = allRecords.length > limitCount;

    // Return only the requested limit
    const data = hasMore ? allRecords.slice(0, limitCount) : allRecords;
    const newLastTimestamp = hasMore ? data[data.length - 1].created_at : undefined;

    return {
      data,
      hasMore,
      lastTimestamp: newLastTimestamp,
    };
  } catch (error) {
    console.error('[formAnalysisApi] Error fetching analyses:', error);
    throw error;
  }
}

/**
 * Fetch a single form analysis by ID.
 * @param analysisId The analysis document ID
 * @returns The form analysis or null if not found
 */
export async function fetchFormAnalysisById(
  analysisId: string
): Promise<FormAnalysis | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Path: form_analyses/{uid}/form_analyses/{analysisId}
    const docPath = `${FORM_ANALYSES_COLLECTION}/${user.uid}/${FORM_ANALYSES_COLLECTION}/${analysisId}`;
    const docRef = doc(db, docPath);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      console.log('[formAnalysisApi] Analysis not found:', analysisId);
      return null;
    }

    const data = snapshot.data() as Omit<FormAnalysis, 'id'>;
    return {
      ...data,
      id: snapshot.id,
    };
  } catch (error) {
    console.error('[formAnalysisApi] Error fetching analysis:', error);
    throw error;
  }
}

/**
 * Delete a form analysis.
 * Note: This only deletes the Firestore document. Cloud storage cleanup
 * should be handled by Cloud Functions or backend API.
 * @param analysisId The analysis document ID
 */
export async function deleteFormAnalysis(analysisId: string): Promise<void> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Path: form_analyses/{uid}/form_analyses/{analysisId}
    const docPath = `${FORM_ANALYSES_COLLECTION}/${user.uid}/${FORM_ANALYSES_COLLECTION}/${analysisId}`;
    const docRef = doc(db, docPath);
    await deleteDoc(docRef);

    console.log('[formAnalysisApi] Analysis deleted:', analysisId);
  } catch (error) {
    console.error('[formAnalysisApi] Error deleting analysis:', error);
    throw error;
  }
}
