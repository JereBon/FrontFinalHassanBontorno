'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '../../services/productService';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage() {
    const params = useParams();
    const id = params.id as string; // Access dynamic route param
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const data = await getProductById(Number(id));
                    setProduct(data);
                } catch (error) {
                    console.error("Failed to fetch product", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000); // Reset message
        }
    };

    if (loading) return <div className="text-center py-20 uppercase tracking-widest text-sm text-gray-500">Cargando...</div>;
    if (!product) return <div className="text-center py-20 uppercase tracking-widest text-sm text-gray-500">Producto no encontrado</div>;

    // Image placeholder logic (same as ProductCard)
    const placeholderImages = [
        'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1760&q=80',
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1572&q=80',
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1587&q=80',
    ];
    const imageSrc = placeholderImages[product.category_id % placeholderImages.length] || placeholderImages[0];

    return (
        <div className="bg-white min-h-[80vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                        <img src={imageSrc} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* details */}
                    <div className="flex flex-col space-y-8">
                        <div>
                            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                                {product.category?.name || 'Colección'}
                            </p>
                            <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        </div>

                        <div className="prose prose-sm text-gray-500">
                            <p>
                                Este producto ha sido confeccionado con los más altos estándares de calidad.
                                Diseñado para ofrecer comodidad y estilo en una pieza atemporal que perdurará en tu guardarropa.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            {product.stock > 0 ? (
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${added ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-black hover:bg-gray-800 text-white'}`}
                                    >
                                        {added ? 'Agregado al Carrito' : 'Agregar al Carrito'}
                                    </button>
                                    {added && (
                                        <Link href="/cart" className="text-center text-sm text-black underline uppercase tracking-wide">
                                            Ver Carrito
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <button disabled className="w-full bg-gray-200 text-gray-500 py-4 text-sm font-bold uppercase tracking-widest cursor-not-allowed">
                                    Agotado
                                </button>
                            )}
                            <p className="text-xs text-gray-400 mt-4 text-center">Stock disponible: {product.stock} unidades</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
