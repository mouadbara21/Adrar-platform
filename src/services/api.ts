import axios from 'axios';
import { Trail, Refuge, Park, User, ReservationData } from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Trails API
export const trailsApi = {
  getAll: async (params?: { search?: string; difficulty?: string; parc?: string }): Promise<Trail[]> => {
    const response = await api.get('/trails', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Trail> => {
    const response = await api.get(`/trails/${id}`);
    return response.data;
  },
};

// Refuges API
export const refugesApi = {
  getAll: async (): Promise<Refuge[]> => {
    const response = await api.get('/refuges');
    return response.data;
  },

  getById: async (id: string): Promise<Refuge> => {
    const response = await api.get(`/refuges/${id}`);
    return response.data;
  },

  createReservation: async (id: string, data: ReservationData) => {
    const response = await api.post(`/refuges/${id}/reservations`, data);
    return response.data;
  },
};

// Parks API
export const parksApi = {
  getAll: async (): Promise<Park[]> => {
    const response = await api.get('/parks');
    return response.data;
  },

  getById: async (id: string): Promise<Park> => {
    const response = await api.get(`/parks/${id}`);
    return response.data;
  },
};

// Auth API
export const authApi = {
  register: async (userData: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role?: string;
    username: string;
    password: string;
  }): Promise<{ user: User }> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<{ user: User }> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export default api;