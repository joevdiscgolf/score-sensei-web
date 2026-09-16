import { SenseiColors } from '../utils/colors';

export function EmptyState() {
  const accentColor = '#6366F1'; // Indigo accent

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        background: `linear-gradient(to bottom, ${SenseiColors.gray[50]}, white, ${SenseiColors.gray[50]})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        {/* Concentric circles icon */}
        <div
          style={{
            width: '120px',
            height: '120px',
            margin: '0 auto',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${accentColor}1A, ${accentColor}0D)`,
            border: `2px solid ${accentColor}33`,
            boxShadow: `0 0 40px 10px ${accentColor}1A`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: `${accentColor}1A`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" opacity="0.3" />
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        </div>

        {/* Text content */}
        <h2
          style={{
            marginTop: '32px',
            fontSize: '24px',
            fontWeight: 700,
            color: SenseiColors.darkGray,
            letterSpacing: '-0.5px',
          }}
        >
          No form analyses yet
        </h2>

        <p
          style={{
            marginTop: '16px',
            fontSize: '16px',
            color: SenseiColors.gray[500],
            lineHeight: '1.5',
          }}
        >
          Record your first throw analysis to see it here. Your form insights will help you improve your disc golf game.
        </p>
      </div>
    </div>
  );
}
