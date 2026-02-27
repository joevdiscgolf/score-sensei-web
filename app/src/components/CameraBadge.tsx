import type { CameraAngle } from '../types/formAnalysis';

interface CameraBadgeProps {
  cameraAngle: CameraAngle;
}

export function CameraBadge({ cameraAngle }: CameraBadgeProps) {
  const isSide = cameraAngle === 'side';

  const gradient = isSide
    ? 'linear-gradient(135deg, #1976D2, #2196F3)'
    : 'linear-gradient(135deg, #00897B, #26A69A)';

  const label = isSide ? 'Side' : 'Rear';

  return (
    <div
      style={{
        background: gradient,
        color: 'white',
        padding: '6px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <span>{label}</span>
    </div>
  );
}
