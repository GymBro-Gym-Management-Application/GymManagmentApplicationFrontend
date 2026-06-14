import { useMutation } from '@tanstack/react-query';
import { createTrainer } from './trainerApi';
import { TrainerPayload } from '../types/trainer.types';

export const useCreateTrainer = () =>
  useMutation({
    mutationFn: (payload: TrainerPayload) => createTrainer(payload),
  });
