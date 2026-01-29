'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOrdersByClient, cancelOrder } from '@/services/orderService';
import { Order, Status } from '@/types';
import Link from 'next/link';

export default function OrdersPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }
        loadOrders();
    }, [user, router, authLoading]);

    const loadOrders = async () => {
        try {
            if (user?.id_key) {
                const data = await getOrdersByClient(user.id_key);
                setOrders(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (order: Order) => {
        if (confirm('¿Estás seguro de cancelar este pedido?')) {
            try {
                await cancelOrder(order);
                loadOrders();
            } catch (error) {
                console.error('Error canceling order:', error);
            }
        }
    };

    const getStatusText = (status: number) => {
        switch (status) {
            case Status.PENDING: return 'Pendiente';
            case Status.IN_PROGRESS: return 'En Proceso';
            case Status.DELIVERED: return 'Entregado';
            case Status.CANCELED: return 'Cancelado';
            default: return 'Desconocido';
        }
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case Status.PENDING: return 'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
            case Status.IN_PROGRESS: return 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
            case Status.DELIVERED: return 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
            case Status.CANCELED: return 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
            default: return 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800';
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="min-h-screen pt-28 pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a Mi Cuenta
                    </Link>
                </div>

                <h1 className="text-2xl font-bold auto-text mb-6">Mis Pedidos</h1>

                {orders.length === 0 ? (
                    <div className="soft-card p-12 text-center">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">Aún no realizaste ningún pedido</p>
                        <Link href="/shop" className="inline-block btn-primary">
                            Ir a la Tienda
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id_key} className="soft-card p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold auto-text text-lg">Pedido #{order.id_key}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(order.date).toLocaleDateString('es-AR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <p className="text-2xl font-bold auto-text">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/profile/orders/${order.id_key}`}
                                            className="px-5 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 rounded-lg transition-all text-sm font-bold uppercase tracking-wide"
                                        >
                                            Ver Detalle
                                        </Link>
                                        {order.status === Status.PENDING && (
                                            <button
                                                onClick={() => handleCancelOrder(order)}
                                                className="px-4 py-2 border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 rounded-lg transition-all text-sm font-bold uppercase tracking-wide"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
