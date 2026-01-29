'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById, getPlaceholderImage } from '../../../services/productService';
import { Product } from '../../../types';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import ReviewsSection from '../../../components/ReviewsSection';

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

    if (loading) return <div className="text-center py-20 uppercase tracking-widest text-sm text-gray-500 pt-32">Cargando...</div>;
    if (!product) return <div className="text-center py-20 uppercase tracking-widest text-sm text-gray-500 pt-32">Producto no encontrado</div>;

    // Use shared image logic (Custom Image > Placeholder)
    const imageSrc = product.image_url || getPlaceholderImage(product.category_id, product.id_key);

    return (
        <div className="min-h-screen flex items-center pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="soft-card p-8 md:p-12">
                    <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver a la tienda
                    </Link>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* Image */}
                        <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
                            <img src={imageSrc} alt={product.name} className="w-full h-full object-cover" />
                        </div>


                        {/* details */}
                        <div className="flex flex-col space-y-8">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                    {product.category?.name || 'Colección'}
                                </p>
                                <h1 className="text-4xl font-bold uppercase tracking-tight auto-text mb-4">{product.name}</h1>
                                <p className="text-2xl font-medium auto-text">${product.price.toFixed(2)}</p>
                            </div>

                            <div className="prose prose-sm text-gray-500 dark:text-gray-400">
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

                    {/* Reviews Section */}
                    {product && <ReviewsSection productId={product.id_key} />}
                </div>
            </div>
        </div>
    );
}
