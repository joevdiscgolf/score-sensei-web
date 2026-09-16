import type { FormObservationsV2, FormObservation } from '../types/formAnalysis';
import { SenseiColors, getSemanticColorDiscrete } from '../utils/colors';

interface FormObservationsViewProps {
  observations: FormObservationsV2;
}

// Category display name mapping
const getCategoryDisplayName = (category: string): string => {
  const names: Record<string, string> = {
    'lower_body': 'Lower body',
    'upper_body': 'Upper body',
    'arm_mechanics': 'Arm mechanics',
    'timing': 'Timing',
    'footwork': 'Footwork',
    'balance': 'Balance',
    'release': 'Release',
  };
  return names[category] || category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

// Severity display mapping
const getSeverityInfo = (severity: string): { color: string; label: string } => {
  switch (severity) {
    case 'good':
      return { color: '#10B981', label: 'Good' };
    case 'minor':
      return { color: '#F59E0B', label: 'Minor' };
    case 'moderate':
      return { color: '#F97316', label: 'Moderate' };
    case 'significant':
      return { color: '#EF4444', label: 'Significant' };
    default:
      return { color: SenseiColors.gray[500]!, label: 'Unknown' };
  }
};

export function FormObservationsView({ observations }: FormObservationsViewProps) {
  const overallScore = Math.round(observations.overall_score * 100);
  const scoreColor = getSemanticColorDiscrete(overallScore);

  // Group observations by category
  const byCategory: Record<string, FormObservation[]> = {};
  Object.values(observations.observations).forEach(obs => {
    if (!byCategory[obs.category]) {
      byCategory[obs.category] = [];
    }
    byCategory[obs.category].push(obs);
  });

  // Get category scores from score breakdown
  const categoryScores: Record<string, number> = {};
  const categoryOrder: Record<string, number> = {};
  if (observations.score_breakdown) {
    observations.score_breakdown.categories.forEach(cat => {
      categoryScores[cat.category] = Math.round(cat.score * 100);
      categoryOrder[cat.category] = cat.display_order || 99;
    });
  }

  // Sort categories by display order
  const sortedCategories = Object.keys(byCategory).sort((a, b) => {
    const orderA = categoryOrder[a] || 99;
    const orderB = categoryOrder[b] || 99;
    return orderA - orderB;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overall Score Card */}
      <div
        className="card"
        style={{
          padding: '20px',
          border: `1px solid ${SenseiColors.gray[100]}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Score Circle */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${scoreColor}20, ${scoreColor}10)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: scoreColor,
              }}
            >
              {overallScore}
            </div>
          </div>

          {/* Label */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: SenseiColors.darkGray,
                marginBottom: '4px',
              }}
            >
              Overall form score
            </div>
            <div
              style={{
                fontSize: '14px',
                color: SenseiColors.gray[500],
              }}
            >
              {Object.keys(observations.observations).length} observations analyzed
            </div>
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {sortedCategories.map(category => {
        const categoryObservations = byCategory[category];
        const categoryScore = categoryScores[category];

        return (
          <div key={category}>
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: SenseiColors.darkGray,
                  margin: 0,
                }}
              >
                {getCategoryDisplayName(category)}
              </h3>
              {categoryScore !== undefined && (
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: getSemanticColorDiscrete(categoryScore),
                  }}
                >
                  {categoryScore}%
                </div>
              )}
            </div>

            {/* Observation Cards in 2-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {categoryObservations.map(obs => {
                const severityInfo = getSeverityInfo(obs.severity || 'good');
                const obsScore = obs.score !== undefined ? Math.round(obs.score * 100) : null;

                return (
                  <div
                    key={obs.id}
                    className="card"
                    style={{
                      padding: '16px',
                      border: `1px solid ${SenseiColors.gray[100]}`,
                      cursor: 'default',
                    }}
                  >
                    {/* Header with severity badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          backgroundColor: `${severityInfo.color}20`,
                          color: severityInfo.color,
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {severityInfo.label}
                      </div>
                      {obsScore !== null && (
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: getSemanticColorDiscrete(obsScore),
                          }}
                        >
                          {obsScore}%
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: SenseiColors.darkGray,
                        marginBottom: '8px',
                        lineHeight: 1.4,
                      }}
                    >
                      {obs.title}
                    </div>

                    {/* Description */}
                    <div
                      style={{
                        fontSize: '13px',
                        color: SenseiColors.gray[600],
                        lineHeight: 1.5,
                      }}
                    >
                      {obs.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {sortedCategories.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: SenseiColors.gray[400],
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>👁️</div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, color: SenseiColors.gray[600], marginBottom: '8px' }}>
            No observations
          </h3>
          <p style={{ fontSize: '14px', color: SenseiColors.gray[500] }}>
            Form observations will appear here when detected during analysis.
          </p>
        </div>
      )}
    </div>
  );
}
