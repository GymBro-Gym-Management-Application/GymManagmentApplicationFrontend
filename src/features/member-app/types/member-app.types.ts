// ─── Auth / Profile ───────────────────────────────────────────────
export interface MemberProfile {
  id: number;
  tenantId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  gender: string | null;
  dob: string | null;
  avatarUrl: string | null;
  status: string;
  trainerId: number | null;
  branchId: number | null;
  createdAt: string;
}

// ─── Timeline event ───────────────────────────────────────────────
export interface TimelineEvent {
  eventType: string;
  description: string;
  occurredAt: string;
}

// ─── Document ─────────────────────────────────────────────────────
export interface MemberDocument {
  id: number;
  fileName: string;
  url: string;
  documentType: string;
  uploadedAt: string;
}

// ─── Workout (member-facing detail) ──────────────────────────────
export interface WorkoutExercise {
  exerciseId: number;
  name: string;
  sets: number;
  reps: number;
  restSec: number;
}

export interface WorkoutDetail {
  id: number;
  name: string;
  goal: string | null;
  difficulty: string | null;
  durationMin: number | null;
  description: string | null;
  exercises: WorkoutExercise[];
}

// ─── Workout completion payload ───────────────────────────────────
export interface WorkoutSetLog {
  exerciseId: number;
  setNo: number;
  reps: number;
  weightKg: number;
  rpe?: number;
}

export interface WorkoutCompletePayload {
  clientId: number;
  startedAt: string;
  endedAt: string;
  calories?: number;
  notes?: string;
  moodBefore?: number;
  moodAfter?: number;
  fatigueLevel?: number;
  sets: WorkoutSetLog[];
}

// ─── API wrappers ─────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[] | null;
}

export interface PaginatedData<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
