'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { getPlaceholderImage } from '../../services/productService';

export default function CartPage() {
    const { cart, removeFromCart, total, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 pt-24">
                <h2 className="text-2xl font-bold uppercase tracking-tight auto-text">Tu carrito está vacío</h2>
                <Link href="/shop" className="text-sm underline text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase tracking-wide">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
            <h1 className="text-3xl font-bold uppercase tracking-tight auto-text mb-8">Carrito de Compras</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="border-t border-gray-200 dark:border-gray-800">
                        {cart.map((item) => (
                            <div key={item.product.id_key} className="flex py-6 border-b border-gray-200 dark:border-gray-800">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100 rounded-lg">
                                    <img
                                        src={item.product.image_url || getPlaceholderImage(item.product.category_id, item.product.id_key)}
                                        alt={item.product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between text-base font-medium auto-text">
                                            <h3 className="uppercase tracking-wide">
                                                <Link href={`/product/${item.product.id_key}`}>{item.product.name}</Link>
                                            </h3>
                                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.product.category?.name}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500 dark:text-gray-400">Cant: {item.quantity}</p>

                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.product.id_key)}
                                                className="font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400 uppercase text-xs tracking-wider"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <button onClick={clearCart} className="text-xs text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white uppercase tracking-wide underline">
                            Vaciar Carrito
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <div className="soft-card p-6">
                        <h2 className="text-lg font-medium auto-text uppercase tracking-wide mb-4">Resumen</h2>
                        <div className="flex justify-between text-base font-medium auto-text mb-4">
                            <p>Subtotal</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Impuestos y envío calculados al finalizar la compra.</p>
                        <Link
                            href="/checkout"
                            className="flex w-full items-center justify-center bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-base font-bold shadow-sm hover:opacity-90 uppercase tracking-widest transition-opacity rounded-md"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
