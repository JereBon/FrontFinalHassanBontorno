import api from './api';
import { Product } from '../types/index';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id_key'>): Promise<Product> => {
  const response = await api.post<Product>('/products', product);
  return response.data;
};