
import api from './api';
import { Candidate } from '@/types';

export const getCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

export const getCandidate = async (id: string) => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};

export const createCandidate = async (candidateData: Omit<Candidate, 'id'>) => {
  const response = await api.post('/candidates', candidateData);
  return response.data;
};

export const updateCandidate = async (id: string, candidateData: Partial<Candidate>) => {
  const response = await api.put(`/candidates/${id}`, candidateData);
  return response.data;
};

export const deleteCandidate = async (id: string) => {
  await api.delete(`/candidates/${id}`);
};
