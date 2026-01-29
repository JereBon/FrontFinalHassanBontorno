'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { getOrderById, getBillById, getOrderDetailsByOrder } from '@/services/orderService';
import { Order, Bill, Status } from '@/types';
import Link from 'next/link';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const { id } = use(params);
    const [order, setOrder] = useState<Order | null>(null);
    const [bill, setBill] = useState<Bill | null>(null);
    const [orderDetails, setOrderDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }
        loadOrderDetail();
    }, [user, router, id, authLoading]);

    const loadOrderDetail = async () => {
        try {
            const orderData = await getOrderById(parseInt(id));
            setOrder(orderData);

            if (orderData.bill_id) {
                const billData = await getBillById(orderData.bill_id);
                setBill(billData);
            }

            // Fetch Items
            const details = await getOrderDetailsByOrder(orderData.id_key);
            setOrderDetails(details);

        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            setLoading(false);
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
            case Status.PENDING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case Status.IN_PROGRESS: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case Status.DELIVERED: return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case Status.CANCELED: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="auto-text mb-4">Pedido no encontrado</p>
                    <Link href="/profile/orders" className="btn-primary">
                        Volver a Mis Pedidos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/profile/orders" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a Mis Pedidos
                    </Link>
                </div>

                {/* Order Header */}
                <div className="soft-card p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold auto-text">Pedido #{order.id_key}</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(order.date).toLocaleDateString('es-AR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                        </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-3xl font-bold auto-text">${order.total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Bill Information */}
                {bill && (
                    <div className="soft-card p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-bold auto-text mb-2">Factura</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Número: {bill.bill_number}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Fecha: {new Date(bill.date).toLocaleDateString('es-AR')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Items Table */}
                <div className="soft-card p-6 mb-6">
                    <h2 className="text-lg font-bold auto-text mb-4">Items</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b dark:border-gray-700">
                                    <th className="text-left py-2 auto-text">Producto</th>
                                    <th className="text-right py-2 auto-text">Cant.</th>
                                    <th className="text-right py-2 auto-text">Precio</th>
                                    <th className="text-right py-2 auto-text">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.map((item) => (
                                    <tr key={item.id_key} className="border-b dark:border-gray-700 last:border-0">
                                        <td className="py-2 text-gray-700 dark:text-gray-300">
                                            {item.product?.name || `Producto #${item.product_id}`}
                                        </td>
                                        <td className="text-right py-2 text-gray-700 dark:text-gray-300">{item.quantity}</td>
                                        <td className="text-right py-2 text-gray-700 dark:text-gray-300">
                                            ${(item.price || item.product?.price || 0).toFixed(2)}
                                        </td>
                                        <td className="text-right py-2 font-medium auto-text">
                                            ${((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="soft-card p-6">
                    <h2 className="text-lg font-bold auto-text mb-4">Resumen del Pedido</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-medium auto-text">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Envío</span>
                            <span className="font-medium auto-text">$0.00</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="font-bold auto-text">Total</span>
                            <span className="font-bold auto-text text-lg">${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
