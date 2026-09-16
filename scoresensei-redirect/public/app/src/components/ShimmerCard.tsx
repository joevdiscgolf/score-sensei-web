export function ShimmerCard() {
  return (
    <div
      className="card"
      style={{
        padding: '16px',
        display: 'flex',
        gap: '12px',
      }}
    >
      {/* Thumbnail skeleton */}
      <div
        className="shimmer"
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '8px',
          flexShrink: 0,
        }}
      />

      {/* Content skeleton */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Date skeleton */}
        <div
          className="shimmer"
          style={{
            height: '20px',
            width: '40%',
            borderRadius: '4px',
          }}
        />

        {/* Time skeleton */}
        <div
          className="shimmer"
          style={{
            height: '14px',
            width: '25%',
            borderRadius: '4px',
          }}
        />

        {/* Badges skeleton */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <div
            className="shimmer"
            style={{
              height: '24px',
              width: '50px',
              borderRadius: '12px',
            }}
          />
          <div
            className="shimmer"
            style={{
              height: '24px',
              width: '50px',
              borderRadius: '12px',
            }}
          />
        </div>
      </div>
    </div>
  );
}
