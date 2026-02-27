import { SenseiColors } from '../utils/colors';
import { useFormAnalyses } from '../hooks/useFormAnalyses';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { AnalysisCard } from '../components/AnalysisCard';
import { ShimmerCard } from '../components/ShimmerCard';
import { EmptyState } from '../components/EmptyState';

export function FormAnalysisHistory() {
  const { analyses, loading, loadingMore, hasMore, loadMore, refresh } =
    useFormAnalyses(10);

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading: loadingMore,
    rootMargin: '200px',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: SenseiColors.gray[50],
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'white',
          borderBottom: `1px solid ${SenseiColors.gray[100]}`,
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: SenseiColors.darkGray,
              margin: 0,
            }}
          >
            Form analysis
          </h1>

          <button
            onClick={refresh}
            disabled={loading}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: SenseiColors.cleanAccentColor,
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="scroll-container"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Loading state */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
          </div>
        )}

        {/* Empty state */}
        {!loading && analyses.length === 0 && <EmptyState />}

        {/* Analysis cards */}
        {!loading && analyses.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} style={{ height: '1px' }} />

            {/* Loading more indicator */}
            {loadingMore && (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <div className="spinner" style={{ margin: '0 auto' }} />
              </div>
            )}

            {/* End message */}
            {!hasMore && analyses.length > 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '24px',
                  color: SenseiColors.gray[400],
                  fontSize: '14px',
                }}
              >
                No more analyses to load
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
