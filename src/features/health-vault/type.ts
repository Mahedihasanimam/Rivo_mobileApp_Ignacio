// ── Shared Generic Types ─────────────────────────────

// ── Domain Models ────────────────────────────────────

export interface Breakdown {
  care: number
  activity: number
  vaccines: number
  weight: number
}

export interface HealthScore {
  score: number
  out_of: number
  status: string
  last_updated: string
  breakdown: Breakdown
}

export interface Vaccinations {
  upcoming_count: number
  upcoming_list: unknown[]
}

export interface WeightTracking {
  current_weight_kg: number
  last_updated: string
}

export interface HealthDocuments {
  total_files: number
}

export interface IHealthVaultData {
  health_score: HealthScore
  vaccinations: Vaccinations
  weight_tracking: WeightTracking
  health_documents: HealthDocuments
  ai_insight: string
}

export interface IDocument {
  id: number
  title: string
  file_url: string
  type: string
  file_size_bytes: number
  file_size_human: string
  created_at: string
}

export interface IWeightLog {
  id: number
  weight_kg: number
  logged_at: string
  logged_at_iso: string
}

export interface ICreateWeightLogPayload {
  weight_kg: number
  logged_at?: string
}

// ── Response Type ─────────────────────────────────────

export interface Summary {
  total_tasks: number;
  completed_tasks: number;
  progress_percentage: number;
  xp_earned_today: number;
  xp_earned_weekly: number;
  streak_days: number;
  level: string;
  current_xp: number;
  next_level_xp: number;
}

export interface Task {
  id: number;
  type: string;
  title: string;
  description: string;
  frequency: string;
  preferred_time: string;
  is_completed_today: boolean;
  xp_reward: number;
}

export interface ICareRespose {
  summary: Summary;
  tasks: Task[];
}