'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCategories, updateCategory } from '@/services/categoryService';
import Link from 'next/link';

export default function EditCategoryPage() {
    const params = useParams();
    const id = Number(params.id);
    const router = useRouter();

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            // Since we don't have getCategoryById, we fetch all and find.
            // Ideally we should add getCategoryById to service/backend if needed, 
            // but this works for small lists.
            const categories = await getCategories();
            const category = categories.find(c => c.id_key === id);

            if (category) {
                setName(category.name);
            } else {
                setError('Categoría no encontrada');
            }
        } catch (err) {
            console.error(err);
            setError('Error al cargar la categoría');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await updateCategory(id, name);
            router.push('/admin/categories');
        } catch (err) {
            console.error(err);
            setError('Error al actualizar la categoría');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-12 text-center">Cargando...</div>;
    if (error && !name) return <div className="p-12 text-center text-red-500">{error}</div>;

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
                <h1 className="text-2xl font-bold auto-text mb-6">Editar Categoría</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium auto-text mb-2">Nombre de la Categoría</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
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
                            disabled={saving || !name.trim()}
                            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
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
