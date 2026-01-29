'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Solo redirigir si ya terminó de cargar y el usuario no existe
        if (!user && typeof window !== 'undefined') {
            const hasToken = localStorage.getItem('token');
            if (!hasToken) {
                router.push('/login');
            }
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold auto-text mb-3">Mi Cuenta</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                        ¡Hola, <span className="font-medium auto-text">{user.name || user.email}</span>! 👋 Gestiona tu perfil y pedidos.
                    </p>
                </div>

                {/* Card Grid - 3 main sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Mis Datos Card */}
                    <Link href="/profile/edit" className="soft-card p-6 hover:shadow-lg transition-all group hover:bg-[#d4f238] hover:text-black hover:border-[#d4f238]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 navbar-btn border-gray-100 dark:border-gray-800 group-hover:bg-[#d4f238] group-hover:text-black group-hover:border-[#d4f238]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold auto-text group-hover:text-black mb-2">Mis Datos</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70">
                            Edita tu información personal
                        </p>
                    </Link>

                    {/* Mis Pedidos Card */}
                    <Link href="/profile/orders" className="soft-card p-6 hover:shadow-lg transition-all group hover:bg-[#d4f238] hover:text-black hover:border-[#d4f238]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 navbar-btn border-gray-100 dark:border-gray-800 group-hover:bg-[#d4f238] group-hover:text-black group-hover:border-[#d4f238]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold auto-text group-hover:text-black mb-2">Mis Pedidos</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70">
                            Historial de compras y estado
                        </p>
                    </Link>

                    {/* Mis Direcciones Card */}
                    <Link href="/profile/addresses" className="soft-card p-6 hover:shadow-lg transition-all group hover:bg-[#d4f238] hover:text-black hover:border-[#d4f238]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 navbar-btn border-gray-100 dark:border-gray-800 group-hover:bg-[#d4f238] group-hover:text-black group-hover:border-[#d4f238]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold auto-text group-hover:text-black mb-2">Mis Direcciones</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70">
                            Gestiona tus direcciones de envío
                        </p>
                    </Link>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-[var(--card)] border border-gray-200 dark:border-gray-800 hover:bg-red-600 hover:border-red-600 hover:text-white text-[var(--foreground)] rounded-xl transition-all font-medium shadow-sm"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
