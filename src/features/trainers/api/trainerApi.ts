import axiosInstance from '../../../api/axios';
import { ENDPOINTS } from '../../../api/endpoints';
import { TrainerPayload, ApiResponse } from '../types/trainer.types';

export const createTrainer = async (payload: TrainerPayload): Promise<ApiResponse<unknown>> => {
  const { data } = await axiosInstance.post<ApiResponse<unknown>>(ENDPOINTS.TRAINERS, payload);
  return data;
};
