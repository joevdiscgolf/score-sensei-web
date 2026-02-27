import { useState, useEffect, useCallback } from 'react';
import type { FormAnalysis } from '../types/formAnalysis';
import { fetchFormAnalyses, deleteFormAnalysis } from '../services/formAnalysisApi';

export function useFormAnalyses(limit: number = 10) {
  const [analyses, setAnalyses] = useState<FormAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastTimestamp, setLastTimestamp] = useState<string | undefined>(undefined);

  // Initial load
  useEffect(() => {
    loadInitial();
  }, []);

  const loadInitial = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFormAnalyses(limit);
      setAnalyses(result.data);
      setHasMore(result.hasMore);
      setLastTimestamp(result.lastTimestamp);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analyses');
      console.error('Error loading analyses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load more for infinite scroll
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || loading) return;

    try {
      setLoadingMore(true);
      const result = await fetchFormAnalyses(limit, lastTimestamp);
      setAnalyses((prev) => [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setLastTimestamp(result.lastTimestamp);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more analyses');
      console.error('Error loading more analyses:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, loading, lastTimestamp, limit]);

  // Refresh data
  const refresh = async () => {
    setLastTimestamp(undefined);
    await loadInitial();
  };

  // Delete analysis with optimistic update
  const deleteAnalysis = async (id: string) => {
    const original = [...analyses];

    // Optimistically remove from UI
    setAnalyses(analyses.filter((a) => a.id !== id));

    try {
      await deleteFormAnalysis(id);
    } catch (err) {
      // Rollback on error
      setAnalyses(original);
      setError(err instanceof Error ? err.message : 'Failed to delete analysis');
      throw err;
    }
  };

  return {
    analyses,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
    deleteAnalysis,
  };
}
