
import api from './api';
import { Interview } from '@/types';

export const getInterviews = async () => {
  const response = await api.get('/interviews');
  return response.data;
};

export const getInterview = async (id: string) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

export const getCandidateInterviews = async (candidateId: string) => {
  const response = await api.get(`/interviews/candidate/${candidateId}`);
  return response.data;
};

export const createInterview = async (interviewData: Omit<Interview, 'id'>) => {
  const response = await api.post('/interviews', interviewData);
  return response.data;
};

export const updateInterview = async (id: string, interviewData: Partial<Interview>) => {
  const response = await api.put(`/interviews/${id}`, interviewData);
  return response.data;
};

export const deleteInterview = async (id: string) => {
  await api.delete(`/interviews/${id}`);
};
