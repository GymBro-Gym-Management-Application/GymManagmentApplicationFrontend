export type ExerciseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ExerciseCategory = 'Strength' | 'Cardio' | 'Flexibility' | 'Balance';

export interface Exercise {
  id: number;
  tenantId: number | null;
  name: string;
  description: string | null;
  instructions: string | null;
  category: ExerciseCategory | null;
  difficulty: ExerciseDifficulty | null;
  tags: string[] | null;
  muscleIds: number[] | null;
  equipmentIds: number[] | null;
  videoUrl: string | null;
  createdAt: string;
}

export interface ExercisePayload {
  tenantId?: number;
  name: string;
  description?: string;
  instructions?: string;
  category?: ExerciseCategory;
  difficulty?: ExerciseDifficulty;
  tags?: string[];
  muscleIds?: number[];
  equipmentIds?: number[];
}

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

export type ExerciseListResponse  = ApiResponse<PaginatedData<Exercise>>;
export type ExerciseCreateResponse = ApiResponse<Exercise>;
