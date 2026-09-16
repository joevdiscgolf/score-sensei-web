import { getSemanticColorDiscrete, hexToRgba } from '../utils/colors';

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  // Convert score to percentage (0-1 -> 0-100) and round to nearest integer
  const percentage = Math.round(score * 100);
  const color = getSemanticColorDiscrete(percentage);
  const shadowColor = hexToRgba(color, 0.4);

  return (
    <div
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        boxShadow: `0 4px 12px ${shadowColor}`,
      }}
    >
      {percentage}%
    </div>
  );
}
