import api from './api';
import { AuthResponse } from '../types/auth';
import { Client } from '../types/client';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Conectamos con el endpoint real que implementó el backend
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, lastname: string, email: string, password: string, telephone: string): Promise<Client> => {
  // Este endpoint crea un cliente pero no inicia sesión.
  // Devuelve los datos del cliente creado.
  const response = await api.post<any>('/clients', { name, lastname, email, password, telephone });
  return response.data;
};