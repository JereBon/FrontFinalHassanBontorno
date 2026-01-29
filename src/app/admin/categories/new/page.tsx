'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/services/categoryService';
import Link from 'next/link';

export default function NewCategoryPage() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createCategory(name);
            router.push('/admin/categories');
        } catch (err) {
            console.error(err);
            setError('Error al crear la categoría');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/categories" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a Categorías
                </Link>
            </div>

            <div className="soft-card p-8">
                <h1 className="text-2xl font-bold auto-text mb-6">Nueva Categoría</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium auto-text mb-2">Nombre de la Categoría</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            placeholder="Ej. Zapatillas, Remeras..."
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading || !name.trim()}
                            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {loading ? 'Creando...' : 'Crear Categoría'}
                        </button>
                        <Link
                            href="/admin/categories"
                            className="px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
