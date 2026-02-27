import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFormAnalysisById, deleteFormAnalysis } from '../services/formAnalysisApi';
import type { FormAnalysis } from '../types/formAnalysis';
import { SenseiColors } from '../utils/colors';
import { formatDateTime } from '../utils/date';
import { CheckpointPlayer } from '../components/CheckpointPlayer';
import { FormObservationsView } from '../components/FormObservationsView';
import { CameraBadge } from '../components/CameraBadge';
import { ScoreBadge } from '../components/ScoreBadge';

type TabType = 'video' | 'analysis';

export function FormAnalysisDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<FormAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('video');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      loadAnalysis(id);
    }
  }, [id]);

  const loadAnalysis = async (analysisId: string) => {
    try {
      setLoading(true);
      const data = await fetchFormAnalysisById(analysisId);
      setAnalysis(data);
    } catch (error) {
      console.error('Error loading analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!analysis || deleting) return;

    const confirmed = window.confirm('Are you sure you want to delete this analysis?');
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteFormAnalysis(analysis.id);
      navigate('/form-analysis');
    } catch (error) {
      console.error('Error deleting analysis:', error);
      alert('Failed to delete analysis');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: SenseiColors.gray[50],
        }}
      >
        <div className="spinner" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: SenseiColors.gray[50],
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: SenseiColors.darkGray }}>Analysis not found</h2>
          <button
            onClick={() => navigate('/form-analysis')}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: SenseiColors.cleanAccentColor,
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Back to history
          </button>
        </div>
      </div>
    );
  }

  const score = analysis.form_observations_v2?.overall_score ?? 0;

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
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => navigate('/form-analysis')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: SenseiColors.cleanAccentColor,
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#EF4444',
              color: 'white',
              fontWeight: 600,
              fontSize: '14px',
              opacity: deleting ? 0.6 : 1,
              cursor: deleting ? 'not-allowed' : 'pointer',
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Info Card */}
        <div
          className="card"
          style={{
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: SenseiColors.darkGray,
                  margin: '0 0 8px 0',
                }}
              >
                Form analysis
              </h1>
              <div style={{ color: SenseiColors.gray[500], fontSize: '14px' }}>
                {analysis.created_at ? formatDateTime(analysis.created_at) : 'Unknown date'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <CameraBadge cameraAngle={analysis.analysis_results.camera_angle} />
              <ScoreBadge score={score} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px 24px',
            marginBottom: '16px',
            display: 'flex',
            gap: '24px',
            borderBottom: `2px solid ${SenseiColors.gray[100]}`,
          }}
        >
          {(['video', 'analysis'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: activeTab === tab ? SenseiColors.cleanAccentColor : SenseiColors.gray[400],
                paddingBottom: '16px',
                borderBottom: activeTab === tab ? `3px solid ${SenseiColors.cleanAccentColor}` : 'none',
                marginBottom: '-18px',
                textTransform: 'capitalize',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="card" style={{ padding: '24px' }}>
          {activeTab === 'video' && (
            <CheckpointPlayer analysis={analysis} />
          )}

          {activeTab === 'analysis' && analysis.form_observations_v2 && (
            <FormObservationsView observations={analysis.form_observations_v2} />
          )}

          {activeTab === 'analysis' && !analysis.form_observations_v2 && (
            <div style={{ textAlign: 'center', color: SenseiColors.gray[400], padding: '60px 20px' }}>
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
      </div>
    </div>
  );
}
