
import api from './api';
import { Offer } from '@/types';

export const getOffers = async () => {
  const response = await api.get('/offers');
  return response.data;
};

export const getOffer = async (id: string) => {
  const response = await api.get(`/offers/${id}`);
  return response.data;
};

export const getCandidateOffers = async (candidateId: string) => {
  const response = await api.get(`/offers/candidate/${candidateId}`);
  return response.data;
};

export const createOffer = async (offerData: Omit<Offer, 'id'>) => {
  const response = await api.post('/offers', offerData);
  return response.data;
};

export const updateOffer = async (id: string, offerData: Partial<Offer>) => {
  const response = await api.put(`/offers/${id}`, offerData);
  return response.data;
};

export const deleteOffer = async (id: string) => {
  await api.delete(`/offers/${id}`);
};
