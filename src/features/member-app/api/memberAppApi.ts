import axiosInstance from '../../../api/axios';
import {
  MemberProfile, TimelineEvent, MemberDocument,
  WorkoutDetail, WorkoutCompletePayload,
  ApiResponse, PaginatedData,
} from '../types/member-app.types';

// ─── Profile ──────────────────────────────────────────────────────
export const fetchMyProfile = async (id: number): Promise<ApiResponse<MemberProfile>> => {
  const { data } = await axiosInstance.get<ApiResponse<MemberProfile>>(`/members/${id}`);
  return data;
};

export const updateMyProfile = async (
  id: number,
  payload: Partial<Pick<MemberProfile, 'firstName' | 'lastName' | 'phone' | 'gender' | 'dob' | 'avatarUrl'>>,
): Promise<ApiResponse<MemberProfile>> => {
  const { data } = await axiosInstance.put<ApiResponse<MemberProfile>>(`/members/${id}`, payload);
  return data;
};

// ─── Timeline ────────────────────────────────────────────────────
export const fetchMyTimeline = async (id: number): Promise<ApiResponse<TimelineEvent[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<TimelineEvent[]>>(`/members/${id}/timeline`);
  return data;
};

// ─── Documents ───────────────────────────────────────────────────
export const fetchMyDocuments = async (id: number): Promise<ApiResponse<MemberDocument[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<MemberDocument[]>>(`/members/${id}/documents`);
  return data;
};

// ─── Workouts ────────────────────────────────────────────────────
export const fetchMyWorkouts = async (
  memberId: number, pageNumber = 1, pageSize = 20,
): Promise<ApiResponse<PaginatedData<WorkoutDetail>>> => {
  const { data } = await axiosInstance.get<ApiResponse<PaginatedData<WorkoutDetail>>>('/workouts', {
    params: { memberId, pageNumber, pageSize },
  });
  return data;
};

export const fetchWorkoutDetail = async (id: number): Promise<ApiResponse<WorkoutDetail>> => {
  const { data } = await axiosInstance.get<ApiResponse<WorkoutDetail>>(`/workouts/${id}`);
  return data;
};

export const completeWorkout = async (
  workoutId: number, payload: WorkoutCompletePayload,
): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.post<ApiResponse<unknown>>(`/workouts/${workoutId}/complete`, payload);
  return data;
};

export const bookmarkWorkout = async (workoutId: number): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.post<ApiResponse<unknown>>(`/workouts/${workoutId}/bookmark`);
  return data;
};

// ─── Exercises ───────────────────────────────────────────────────
export const fetchExercises = async (
  pageNumber = 1, pageSize = 20, tag?: string,
): Promise<ApiResponse<PaginatedData<{
  id: number; name: string; category: string | null;
  difficulty: string | null; tags: string[] | null; videoUrl: string | null;
}>>> => {
  const { data } = await axiosInstance.get('/exercises', {
    params: { pageNumber, pageSize, tag: tag || undefined },
  });
  return data;
};

// ─── Plans ────────────────────────────────────────────────────────
export const fetchMyPlans = async (
  pageNumber = 1, pageSize = 20,
): Promise<ApiResponse<PaginatedData<{
  id: number; name: string; durationWeeks: number;
  goal: string | null; difficulty: string | null; isActive: boolean;
}>>> => {
  const { data } = await axiosInstance.get('/plans', { params: { pageNumber, pageSize } });
  return data;
};
