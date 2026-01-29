import Link from 'next/link';
import { Product } from '../types';
import { getPlaceholderImage } from '../services/productService';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Si hay una imagen personalizada, úsala. Si no, usa el placeholder.
    const imageSrc = product.image_url || getPlaceholderImage(product.category_id, product.id_key);

    return (
        <Link href={`/product/${product.id_key}`} className="group block">
            <div className="soft-card p-3 transition-all duration-300 hover:shadow-lg group-hover:-translate-y-1">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Botón flotante de añadir rápido (visual) */}
                    <div className="absolute bottom-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>

                    {product.stock === 0 && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                            Agotado
                        </div>
                    )}
                </div>

                <div className="mt-4 px-1 pb-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category?.name}</p>
                            <h3 className="text-sm font-bold auto-text leading-tight">
                                {product.name}
                            </h3>
                        </div>
                        <p className="text-sm font-bold text-black bg-[#d4f238] px-2 py-0.5 rounded-md ml-2">
                            ${product.price.toFixed(0)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
