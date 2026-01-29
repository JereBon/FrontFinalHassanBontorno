import api from './api';
import { Review } from '../types';

// Comentario: Service para manejo de reseñas de productos

interface CreateReviewPayload {
    rating: number; // 1-5
    comment: string;
    product_id: number;
    client_id: number;
}

interface UpdateReviewPayload {
    rating?: number;
    comment?: string;
}

/**
 * Obtener todas las reseñas de un producto específico
 */
export const getReviewsByProduct = async (productId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews?product_id=${productId}`);
    return response.data;
};

/**
 * Obtener una reseña por ID
 */
export const getReviewById = async (id: number): Promise<Review> => {
    const response = await api.get<Review>(`/reviews/${id}`);
    return response.data;
};

/**
 * Crear una nueva reseña
 */
export const createReview = async (payload: CreateReviewPayload): Promise<Review> => {
    const response = await api.post<Review>('/reviews', payload);
    return response.data;
};

/**
 * Actualizar una reseña existente (solo el dueño)
 */
export const updateReview = async (id: number, payload: UpdateReviewPayload): Promise<Review> => {
    const response = await api.put<Review>(`/reviews/${id}`, payload);
    return response.data;
};

/**
 * Eliminar una reseña (solo el dueño)
 */
export const deleteReview = async (id: number): Promise<void> => {
    await api.delete(`/reviews/${id}`);
};
