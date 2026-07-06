import axiosInstance from '../../../api/axios';
import {
  TrainerProfile, ScheduleSlot, TrainerPerformance,
  TrainerEarnings, ClientAssignment, ClientNote, PlanAnalytics,
  ApiResponse,
} from '../types/trainer-app.types';
import { MemberProfile, TimelineEvent, MemberDocument } from '../../member-app/types/member-app.types';

// ─── Profile ──────────────────────────────────────────────────────
export const fetchTrainerProfile = async (id: number): Promise<ApiResponse<TrainerProfile>> => {
  const { data } = await axiosInstance.get<ApiResponse<TrainerProfile>>(`/trainers/${id}`);
  return data;
};

export const updateTrainerProfile = async (
  id: number,
  payload: Partial<Pick<TrainerProfile, 'displayName' | 'bio' | 'phone' | 'email' | 'isAvailable'>>,
): Promise<ApiResponse<TrainerProfile>> => {
  const { data } = await axiosInstance.put<ApiResponse<TrainerProfile>>(`/trainers/${id}`, payload);
  return data;
};

// ─── Schedule ─────────────────────────────────────────────────────
export const fetchSchedule = async (id: number): Promise<ApiResponse<ScheduleSlot[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<ScheduleSlot[]>>(`/trainers/${id}/schedule`);
  return data;
};

export const updateSchedule = async (
  id: number, slots: ScheduleSlot[],
): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.put<ApiResponse<unknown>>(`/trainers/${id}/schedule`, { slots });
  return data;
};

// ─── Performance & Earnings ───────────────────────────────────────
export const fetchPerformance = async (id: number): Promise<ApiResponse<TrainerPerformance>> => {
  const { data } = await axiosInstance.get<ApiResponse<TrainerPerformance>>(`/trainers/${id}/performance`);
  return data;
};

export const fetchEarnings = async (
  id: number, month?: number, year?: number,
): Promise<ApiResponse<TrainerEarnings>> => {
  const { data } = await axiosInstance.get<ApiResponse<TrainerEarnings>>(`/trainers/${id}/earnings`, {
    params: { month, year },
  });
  return data;
};

// ─── Clients ──────────────────────────────────────────────────────
export const fetchMyClients = async (trainerId: number): Promise<ApiResponse<ClientAssignment[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<ClientAssignment[]>>(`/trainers/${trainerId}/clients`);
  return data;
};

export const fetchClientProfile = async (memberId: number): Promise<ApiResponse<MemberProfile>> => {
  const { data } = await axiosInstance.get<ApiResponse<MemberProfile>>(`/members/${memberId}`);
  return data;
};

export const fetchClientTimeline = async (memberId: number): Promise<ApiResponse<TimelineEvent[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<TimelineEvent[]>>(`/members/${memberId}/timeline`);
  return data;
};

export const fetchClientNotes = async (memberId: number): Promise<ApiResponse<ClientNote[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<ClientNote[]>>(`/members/${memberId}/notes`);
  return data;
};

export const addClientNote = async (
  memberId: number, note: string, trainerId: number,
): Promise<ApiResponse<ClientNote>> => {
  const { data } = await axiosInstance.post<ApiResponse<ClientNote>>(`/members/${memberId}/notes`, { note, trainerId });
  return data;
};

export const fetchClientDocuments = async (memberId: number): Promise<ApiResponse<MemberDocument[]>> => {
  const { data } = await axiosInstance.get<ApiResponse<MemberDocument[]>>(`/members/${memberId}/documents`);
  return data;
};

// ─── Plan analytics ───────────────────────────────────────────────
export const fetchPlanAnalytics = async (planId: number): Promise<ApiResponse<PlanAnalytics>> => {
  const { data } = await axiosInstance.get<ApiResponse<PlanAnalytics>>(`/plans/${planId}/analytics`);
  return data;
};
