import api from './api';
import { Category } from '../types';

export const getCategories = async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
};

/**
 * Crear nueva categoría (Admin)
 */
export const createCategory = async (name: string): Promise<Category> => {
    const response = await api.post<Category>('/categories', { name });
    return response.data;
};

/**
 * Actualizar categoría (Admin)
 */
export const updateCategory = async (id: number, name: string): Promise<Category> => {
    const response = await api.put<Category>(`/categories/${id}`, { name });
    return response.data;
};

/**
 * Eliminar categoría (Admin)
 */
export const deleteCategory = async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
};
