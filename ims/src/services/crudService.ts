
import { Candidate, Interview, Feedback, Offer } from "@/types";

// Mock storage with localStorage
const getStorageData = <T>(key: string, defaultValue: T[]): T[] => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const setStorageData = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Generic CRUD operations
export const crudService = {
  // Create
  create: <T extends { id: string }>(collection: string, item: T): T => {
    const items = getStorageData<T>(collection, []);
    const newItems = [...items, item];
    setStorageData(collection, newItems);
    return item;
  },

  // Read all
  getAll: <T>(collection: string, defaultValue: T[] = []): T[] => {
    return getStorageData<T>(collection, defaultValue);
  },

  // Read one
  getById: <T extends { id: string }>(collection: string, id: string): T | null => {
    const items = getStorageData<T>(collection, []);
    return items.find(item => item.id === id) || null;
  },

  // Update
  update: <T extends { id: string }>(collection: string, id: string, updates: Partial<T>): T | null => {
    const items = getStorageData<T>(collection, []);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    const updatedItem = { ...items[index], ...updates };
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    
    setStorageData(collection, updatedItems);
    return updatedItem;
  },

  // Delete
  delete: <T extends { id: string }>(collection: string, id: string): boolean => {
    const items = getStorageData<T>(collection, []);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    setStorageData(collection, filteredItems);
    return true;
  },

  // Query with filters
  query: <T>(collection: string, filterFn: (item: T) => boolean): T[] => {
    const items = getStorageData<T>(collection, []);
    return items.filter(filterFn);
  }
};

// Specific services
export const candidateService = {
  getAll: (): Candidate[] => crudService.getAll<Candidate>("candidates", []),
  getById: (id: string): Candidate | null => crudService.getById<Candidate>("candidates", id),
  create: (candidate: Candidate): Candidate => crudService.create<Candidate>("candidates", candidate),
  update: (id: string, updates: Partial<Candidate>): Candidate | null => 
    crudService.update<Candidate>("candidates", id, updates),
  delete: (id: string): boolean => crudService.delete<Candidate>("candidates", id),
  getByStatus: (status: string): Candidate[] => 
    crudService.query<Candidate>("candidates", candidate => candidate.status === status)
};

export const interviewService = {
  getAll: (): Interview[] => crudService.getAll<Interview>("interviews", []),
  getById: (id: string): Interview | null => crudService.getById<Interview>("interviews", id),
  create: (interview: Interview): Interview => crudService.create<Interview>("interviews", interview),
  update: (id: string, updates: Partial<Interview>): Interview | null => 
    crudService.update<Interview>("interviews", id, updates),
  delete: (id: string): boolean => crudService.delete<Interview>("interviews", id),
  getByCandidateId: (candidateId: string): Interview[] => 
    crudService.query<Interview>("interviews", interview => interview.candidateId === candidateId),
  getByStatus: (status: string): Interview[] => 
    crudService.query<Interview>("interviews", interview => interview.status === status)
};

export const feedbackService = {
  getAll: (): Feedback[] => crudService.getAll<Feedback>("feedback", []),
  getById: (id: string): Feedback | null => crudService.getById<Feedback>("feedback", id),
  create: (feedback: Feedback): Feedback => crudService.create<Feedback>("feedback", feedback),
  update: (id: string, updates: Partial<Feedback>): Feedback | null => 
    crudService.update<Feedback>("feedback", id, updates),
  delete: (id: string): boolean => crudService.delete<Feedback>("feedback", id),
  getByInterviewId: (interviewId: string): Feedback[] => 
    crudService.query<Feedback>("feedback", feedback => feedback.interviewId === interviewId)
};

export const offerService = {
  getAll: (): Offer[] => crudService.getAll<Offer>("offers", []),
  getById: (id: string): Offer | null => crudService.getById<Offer>("offers", id),
  create: (offer: Offer): Offer => crudService.create<Offer>("offers", offer),
  update: (id: string, updates: Partial<Offer>): Offer | null => 
    crudService.update<Offer>("offers", id, updates),
  delete: (id: string): boolean => crudService.delete<Offer>("offers", id),
  getByCandidateId: (candidateId: string): Offer[] => 
    crudService.query<Offer>("offers", offer => offer.candidateId === candidateId),
  getByStatus: (status: string): Offer[] => 
    crudService.query<Offer>("offers", offer => offer.status === status)
};
