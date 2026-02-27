import { useNavigate } from 'react-router-dom';
import type { FormAnalysis } from '../types/formAnalysis';
import { formatDate, formatTime } from '../utils/date';
import { getSemanticColorDiscrete, hexToRgba, SenseiColors } from '../utils/colors';
import { CameraBadge } from './CameraBadge';
import { ScoreBadge } from './ScoreBadge';

interface AnalysisCardProps {
  analysis: FormAnalysis;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  const navigate = useNavigate();

  // Use overall_score from form_observations_v2 (0.0-1.0 scale)
  const score = analysis.form_observations_v2?.overall_score ?? 0;
  const thumbnailUrl = analysis.video_metadata.thumbnail_url;
  const cameraAngle = analysis.analysis_results.camera_angle;
  const createdAt = analysis.created_at;

  const scoreColor = getSemanticColorDiscrete(score * 100);
  const shadowColor = hexToRgba(scoreColor, 0.4);

  const handleClick = () => {
    navigate(`/form-analysis/${analysis.id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      style={{
        padding: '16px',
        display: 'flex',
        gap: '12px',
        cursor: 'pointer',
        boxShadow: `0 2px 8px ${shadowColor}`,
      }}
    >
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Date */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: SenseiColors.darkGray,
          }}
        >
          {createdAt ? formatDate(createdAt) : 'Unknown date'}
        </div>

        {/* Time */}
        <div
          style={{
            fontSize: '12px',
            color: SenseiColors.gray[500],
          }}
        >
          {createdAt ? formatTime(createdAt) : 'Unknown time'}
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <CameraBadge cameraAngle={cameraAngle} />
          <ScoreBadge score={score} />
        </div>
      </div>

      {/* Thumbnail */}
      <div
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '8px',
          flexShrink: 0,
          backgroundColor: SenseiColors.gray[200],
          backgroundImage: thumbnailUrl ? `url(${thumbnailUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!thumbnailUrl && (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={SenseiColors.gray[400]}
            strokeWidth="2"
          >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        )}
      </div>
    </div>
  );
}
