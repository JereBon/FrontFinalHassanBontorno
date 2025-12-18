export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string; // Opcional si no tienes imágenes aún
}