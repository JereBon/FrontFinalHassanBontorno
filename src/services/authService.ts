import api from './api';
import { AuthResponse } from '../types/auth';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Conectamos con el endpoint real que implementó el backend
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, lastname: string, email: string, password: string): Promise<AuthResponse> => {
  // Conectamos con el endpoint de creación de clientes
  const response = await api.post<any>('/clients/', { name, lastname, email, password, telephone: "00000000" });
  
  // El endpoint /clients/ devuelve el usuario creado pero no un token de sesión.
  // Devolvemos una estructura compatible, pero el usuario deberá loguearse después.
  return {
    token: '', 
    user: { email: response.data.email }
  };
};