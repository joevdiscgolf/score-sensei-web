export type CameraAngle = 'side' | 'rear';
export type Handedness = 'left' | 'right';
export type VideoOrientation = 'portrait' | 'landscape';
export type DeviationSeverity = 'good' | 'minor' | 'moderate' | 'significant';
export type ThrowType = 'backhand' | 'forehand';

export interface VideoMetadata {
  video_url?: string;
  video_storage_path?: string;
  skeleton_video_url?: string;
  skeleton_only_video_url?: string;
  thumbnail_url?: string;
  video_duration_seconds: number;
  total_frames: number;
  video_width?: number;
  video_height?: number;
  video_orientation?: VideoOrientation;
  video_aspect_ratio?: number;
  returned_video_aspect_ratio?: number;
  camera_stability?: number;
  camera_stability_threshold?: number;
}

export interface AnalysisResults {
  overall_form_score?: number;
  throw_type: ThrowType;
  camera_angle: CameraAngle;
  detected_handedness?: Handedness;
  worst_deviation_severity?: DeviationSeverity;
  detected_camera_angle_degrees?: number;
}

export interface CheckpointMetadata {
  checkpoint_id: string;
  name: string;
  frame_number: number;
  timestamp_seconds: number;
  description?: string;
}

export interface UserPoseData {
  image_url?: string;
  skeleton_overlay_url?: string;
}

export interface ProReferencePoseData {
  image_url?: string;
  skeleton_overlay_url?: string;
  pro_name?: string;
}

export interface DeviationAnalysis {
  severity: DeviationSeverity;
  summary: string;
  details: string[];
}

export interface UserAlignmentMetadata {
  scale_factor?: number;
  x_offset?: number;
  y_offset?: number;
}

export interface CheckpointDataV2 {
  metadata: CheckpointMetadata;
  user_pose: UserPoseData;
  pro_reference_pose?: ProReferencePoseData;
  deviation_analysis: DeviationAnalysis;
  user_alignment_metadata?: UserAlignmentMetadata;
  coaching_tips: string[];
}

export interface FormObservation {
  id: string;
  observation_id?: string;
  category: string;
  title: string;
  description: string;
  severity?: DeviationSeverity;
  score?: number;
  start_time?: number;
  end_time?: number;
}

export interface FormObservationsV2 {
  observations: { [key: string]: FormObservation };
  overall_score: number;
  score_breakdown?: ScoreBreakdown;
}

export interface ScoreBreakdown {
  overall_score: number;
  overall_score_pct: number;
  categories: CategoryScoreBreakdown[];
  categories_with_data: number;
  total_observations: number;
  weights_redistributed?: boolean;
  original_weights?: { [key: string]: number };
}

export interface CategoryScoreBreakdown {
  category: string;
  category_name: string;
  score: number;
  weight: number;
  weighted_contribution: number;
  observations: ObservationScoreBreakdown[];
  observation_count: number;
  display_order?: number;
}

export interface ObservationScoreBreakdown {
  observation_id: string;
  observation_name: string;
  score: number;
  weight: number;
  weighted_contribution: number;
}

export interface ProComparisonConfig {
  pro_name: string;
  throw_type: ThrowType;
  camera_angle: CameraAngle;
}

export interface AnalysisWarning {
  message: string;
  severity: string;
  warning_type?: string;
}

export interface FormAnalysis {
  id: string;
  uid?: string;
  version?: string;
  session_id?: string;
  status?: string;
  created_at?: string;
  video_metadata: VideoMetadata;
  analysis_results: AnalysisResults;
  checkpoints: CheckpointDataV2[];
  pro_comparison_config?: ProComparisonConfig;
  form_observations_v2?: FormObservationsV2;
  warnings?: AnalysisWarning[];
}

export interface PaginatedFormAnalyses {
  data: FormAnalysis[];
  hasMore: boolean;
  lastTimestamp?: string;
}
