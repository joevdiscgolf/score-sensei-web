import { SenseiColors } from '../utils/colors';

interface VideoPlayerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
}

export function VideoPlayer({ videoUrl, thumbnailUrl }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: SenseiColors.gray[200],
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={SenseiColors.gray[400]}
          strokeWidth="2"
        >
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <div style={{ color: SenseiColors.gray[500], fontSize: '14px' }}>
          Video not available
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      <video
        src={videoUrl}
        poster={thumbnailUrl}
        controls
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
