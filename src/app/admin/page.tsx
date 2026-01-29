'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2 auto-text">Panel de Administración</h1>
                <p className="text-gray-500 dark:text-gray-400">Gestiona el inventario y configuración de la tienda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Productos Card */}
                <Link href="/admin/products" className="group">
                    <div className="soft-card p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-[var(--primary)] text-center flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#d4f238] flex items-center justify-center transition-transform group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold auto-text mb-1">Productos</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Agregar, editar o eliminar productos del catálogo.</p>
                        </div>
                    </div>
                </Link>

                {/* Categorías Card */}
                <Link href="/admin/categories" className="group">
                    <div className="soft-card p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-2 border-transparent hover:border-[var(--primary)] text-center flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#d4f238] flex items-center justify-center transition-transform group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold auto-text mb-1">Categorías</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Gestionar las categorías y organización de la tienda.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
