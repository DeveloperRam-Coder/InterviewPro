
import api from './api';
import { Feedback } from '@/types';

export const getFeedback = async () => {
  const response = await api.get('/feedback');
  return response.data;
};

export const getFeedbackById = async (id: string) => {
  const response = await api.get(`/feedback/${id}`);
  return response.data;
};

export const getInterviewFeedback = async (interviewId: string) => {
  const response = await api.get(`/feedback/interview/${interviewId}`);
  return response.data;
};

export const createFeedback = async (feedbackData: Omit<Feedback, 'id'>) => {
  const response = await api.post('/feedback', feedbackData);
  return response.data;
};

export const updateFeedback = async (id: string, feedbackData: Partial<Feedback>) => {
  const response = await api.put(`/feedback/${id}`, feedbackData);
  return response.data;
};

export const deleteFeedback = async (id: string) => {
  await api.delete(`/feedback/${id}`);
};
