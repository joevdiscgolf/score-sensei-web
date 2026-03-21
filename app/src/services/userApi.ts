import { httpsCallable } from 'firebase/functions';
import { functions, auth } from './firebase';

interface DeleteUserResponse {
  success: boolean;
  deletedCounts: {
    rounds: number;
    formAnalyses: number;
    puttPracticeSessions: number;
    liveAnalysisSessions: number;
    storageFiles: number;
  };
  errors: string[];
}

/**
 * Delete the current user's account and all associated data.
 * Calls the deleteUserAccount Cloud Function.
 * @returns DeleteUserResponse with deletion counts
 */
export async function deleteUserAccount(): Promise<DeleteUserResponse> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const callable = httpsCallable<void, DeleteUserResponse>(
      functions,
      'deleteUserAccount'
    );
    const result = await callable();

    console.log('[userApi] Account deleted successfully:', result.data);
    return result.data;
  } catch (error) {
    console.error('[userApi] Error deleting account:', error);
    throw error;
  }
}
