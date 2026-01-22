'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getClientById } from '../../services/clientService';
import { Client, Order, Status, DeliveryMethod } from '../../types';

export default function ProfilePage() {
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [clientData, setClientData] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            if (typeof window !== 'undefined') router.push('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                if (user?.id_key) {
                    const data = await getClientById(user.id_key);
                    setClientData(data);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || loading) return <div className="text-center py-20 uppercase tracking-widest text-sm text-gray-500">Cargando perfil...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-12 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900">Mi Cuenta</h1>
                <button onClick={logout} className="text-sm font-bold uppercase tracking-wide text-red-600 hover:text-red-800">
                    Cerrar Sesión
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* User Info */}
                <div className="md:col-span-1">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-6">Información Personal</h2>
                    <div className="bg-gray-50 p-6 space-y-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Nombre</p>
                            <p className="font-medium">{user?.name} {user?.lastname}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Email</p>
                            <p className="font-medium">{user?.email}</p>
                        </div>
                        {clientData?.telephone && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Teléfono</p>
                                <p className="font-medium">{clientData.telephone}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order History */}
                <div className="md:col-span-2">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-6">Historial de Pedidos</h2>
                    {!clientData?.orders || clientData.orders.length === 0 ? (
                        <p className="text-gray-500 italic">No has realizado pedidos aún.</p>
                    ) : (
                        <div className="space-y-4">
                            {clientData.orders.map((order) => (
                                <div key={order.id_key} className="border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-bold uppercase mb-1">Pedido #{order.id_key}</p>
                                        <p className="text-xs text-gray-500 mb-1">{new Date(order.date).toLocaleDateString()}</p>
                                        <span className={`inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest ${order.status === Status.DELIVERED ? 'bg-green-100 text-green-800' :
                                                order.status === Status.CANCELED ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {order.status === Status.PENDING ? 'Pendiente' :
                                                order.status === Status.IN_PROGRESS ? 'En Progreso' :
                                                    order.status === Status.DELIVERED ? 'Entregado' : 'Cancelado'}
                                        </span>
                                    </div>
                                    <div className="mt-4 sm:mt-0 text-right">
                                        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500 uppercase">
                                            {order.delivery_method === DeliveryMethod.HOME_DELIVERY ? 'Envío a Domicilio' :
                                                order.delivery_method === DeliveryMethod.DRIVE_THRU ? 'Drive Thru' : 'Retiro en Tienda'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
