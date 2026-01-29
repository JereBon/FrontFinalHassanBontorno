import api from './api';
import { Product } from '../types/index';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getPlaceholderImage = (categoryId: number | null | undefined, index: number): string => {
  // Imágenes estáticas y confiables de Unsplash para evitar errores de red con source.unsplash.com
  const collections: Record<number, string[]> = {
    1: [ // Prendas Superiores (T-Shirts, Hoodies)
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', // White Tee
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', // Graphic Tee
      'https://images.unsplash.com/photo-1618354691438-675e9549558d?auto=format&fit=crop&w=800&q=80', // Black Tee
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'  // Hoodie
    ],
    2: [ // Prendas Inferiores (Pants, Jeans)
      'https://images.unsplash.com/photo-1542272617-08f08630329e?auto=format&fit=crop&w=800&q=80', // Jeans
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80', // Beige Trousers
      'https://images.unsplash.com/photo-1584370848010-d7d6371f35a7?auto=format&fit=crop&w=800&q=80'  // Skinny
    ],
    3: [ // Abrigos (Coats, Jackets)
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', // Grey Coat
      'https://images.unsplash.com/photo-1520975661595-64536ef8ad7e?auto=format&fit=crop&w=800&q=80', // Denim Jacket
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=800&q=80'  // Brown Coat
    ],
    4: [ // Accesorios (Bags, Glasses)
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', // Bag
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80', // Sunglasses
      'https://images.unsplash.com/photo-1627123424574-18bd75a32652?auto=format&fit=crop&w=800&q=80'  // Watch
    ],
    5: [ // Calzado (Shoes)
      'https://images.unsplash.com/photo-1560769629-975e13f51863?auto=format&fit=crop&w=800&q=80', // Formal
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', // Sneakers
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'  // Boots
    ]
  };

  const catId = categoryId || 1; // Default to 1 if null
  const images = collections[catId] || collections[1];
  // Usar el ID como índice determinístico
  return images[index % images.length];
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Omit<Product, 'id_key'>): Promise<Product> => {
  const response = await api.post<Product>('/products', product);
  return response.data;
};

/**
 * Actualizar producto existente (Admin)
 */
export const updateProduct = async (id: number, data: Partial<Product>): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
};

/**
 * Eliminar producto (Admin)
 */
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};