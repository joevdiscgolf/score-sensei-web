import { useState, useRef, useEffect } from 'react';
import type { FormAnalysis } from '../types/formAnalysis';
import { SenseiColors } from '../utils/colors';

interface CheckpointPlayerProps {
  analysis: FormAnalysis;
}

export function CheckpointPlayer({ analysis }: CheckpointPlayerProps) {
  const [selectedCheckpointIndex, setSelectedCheckpointIndex] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const checkpoints = analysis.checkpoints || [];
  const selectedCheckpoint = checkpoints[selectedCheckpointIndex];

  // Get video URL - prefer skeleton overlay, fallback to original
  const videoUrl = showSkeleton && analysis.video_metadata.skeleton_video_url
    ? analysis.video_metadata.skeleton_video_url
    : analysis.video_metadata.video_url;

  useEffect(() => {
    if (videoRef.current && selectedCheckpoint) {
      // Seek to checkpoint timestamp
      videoRef.current.currentTime = selectedCheckpoint.metadata.timestamp_seconds;
    }
  }, [selectedCheckpointIndex, selectedCheckpoint]);

  const handleCheckpointClick = (index: number) => {
    setSelectedCheckpointIndex(index);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;

    if (videoRef.current) {
      videoRef.current.currentTime = percentage * videoRef.current.duration;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Video Player */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            style={{
              width: '100%',
              maxHeight: '500px',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: SenseiColors.gray[400],
            }}
          >
            No video available
          </div>
        )}
      </div>

      {/* Skeleton Toggle */}
      {analysis.video_metadata.skeleton_video_url && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => setShowSkeleton(!showSkeleton)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: showSkeleton ? SenseiColors.cleanAccentColor : SenseiColors.gray[200],
              color: showSkeleton ? 'white' : SenseiColors.gray[700],
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {showSkeleton ? 'Show original video' : 'Show skeleton overlay'}
          </button>
        </div>
      )}

      {/* Checkpoint Timeline */}
      {checkpoints.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: SenseiColors.darkGray,
              marginBottom: '12px',
            }}
          >
            Checkpoints
          </div>

          {/* Timeline Scrubber */}
          <div
            onClick={handleTimelineClick}
            style={{
              position: 'relative',
              height: '40px',
              backgroundColor: SenseiColors.gray[100],
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '16px',
            }}
          >
            {checkpoints.map((checkpoint, index) => {
              const percentage = (checkpoint.metadata.timestamp_seconds / analysis.video_metadata.video_duration_seconds) * 100;
              const isSelected = index === selectedCheckpointIndex;

              return (
                <div
                  key={checkpoint.metadata.checkpoint_id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckpointClick(index);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${percentage}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isSelected ? '16px' : '12px',
                    height: isSelected ? '16px' : '12px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? SenseiColors.cleanAccentColor : SenseiColors.gray[400],
                    border: isSelected ? '2px solid white' : 'none',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    zIndex: isSelected ? 2 : 1,
                  }}
                  title={checkpoint.metadata.name}
                />
              );
            })}
          </div>

          {/* Checkpoint Selector Buttons */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {checkpoints.map((checkpoint, index) => {
              const isSelected = index === selectedCheckpointIndex;

              return (
                <button
                  key={checkpoint.metadata.checkpoint_id}
                  onClick={() => handleCheckpointClick(index)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: isSelected ? SenseiColors.cleanAccentColor : SenseiColors.gray[100],
                    color: isSelected ? 'white' : SenseiColors.gray[700],
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? 'none' : `1px solid ${SenseiColors.gray[200]}`,
                  }}
                >
                  {checkpoint.metadata.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Checkpoint Details */}
      {selectedCheckpoint && (
        <div
          className="card"
          style={{
            padding: '20px',
            border: `1px solid ${SenseiColors.gray[100]}`,
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: SenseiColors.darkGray,
              margin: '0 0 16px 0',
            }}
          >
            {selectedCheckpoint.metadata.name}
          </h3>

          {/* Comparison Images */}
          {(selectedCheckpoint.user_pose.image_url || selectedCheckpoint.pro_reference_pose?.image_url) && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              {selectedCheckpoint.user_pose.image_url && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: SenseiColors.gray[600], marginBottom: '8px' }}>
                    Your form
                  </div>
                  <img
                    src={selectedCheckpoint.user_pose.image_url}
                    alt="Your form"
                    style={{ width: '100%', borderRadius: '8px', border: `1px solid ${SenseiColors.gray[200]}` }}
                  />
                </div>
              )}

              {selectedCheckpoint.pro_reference_pose?.image_url && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: SenseiColors.gray[600], marginBottom: '8px' }}>
                    {selectedCheckpoint.pro_reference_pose.pro_name || 'Pro reference'}
                  </div>
                  <img
                    src={selectedCheckpoint.pro_reference_pose.image_url}
                    alt="Pro reference"
                    style={{ width: '100%', borderRadius: '8px', border: `1px solid ${SenseiColors.gray[200]}` }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Deviation Analysis */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: SenseiColors.darkGray, marginBottom: '8px' }}>
              Analysis
            </div>
            <div style={{ fontSize: '14px', color: SenseiColors.gray[600], marginBottom: '8px' }}>
              {selectedCheckpoint.deviation_analysis.summary}
            </div>
            {selectedCheckpoint.deviation_analysis.details.length > 0 && (
              <ul style={{ margin: '0', paddingLeft: '20px', color: SenseiColors.gray[600] }}>
                {selectedCheckpoint.deviation_analysis.details.map((detail, i) => (
                  <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>{detail}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Coaching Tips */}
          {selectedCheckpoint.coaching_tips.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: SenseiColors.darkGray, marginBottom: '8px' }}>
                Coaching tips
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', color: SenseiColors.gray[600] }}>
                {selectedCheckpoint.coaching_tips.map((tip, i) => (
                  <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
