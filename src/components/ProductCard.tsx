import Link from 'next/link';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Placeholder image since backend doesn't provide one in schema
    // Using a distinct placeholder based on category_id to give variety
    const placeholderImages = [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80', // Clothing
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80', // T-shirt
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1572&q=80', // Shirt
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80', // Pants
    ];

    const imageSrc = placeholderImages[product.category_id % placeholderImages.length] || placeholderImages[0];

    return (
        <Link href={`/product/${product.id_key}`} className="group block">
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <img
                    src={imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                />
                {product.stock === 0 && (
                    <div className="absolute top-2 right-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-1">
                        Agotado
                    </div>
                )}
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700 uppercase tracking-wide">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}
