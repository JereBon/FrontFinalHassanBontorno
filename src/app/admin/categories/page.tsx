'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCategories, deleteCategory } from '@/services/categoryService';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta categoría? Esto podría afectar a los productos asociados.')) {
            try {
                await deleteCategory(id);
                loadCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Hubo un error al eliminar la categoría.');
            }
        }
    };

    if (loading) return <div className="p-8 text-center">Cargando categorías...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold auto-text">Categorías</h1>
                <Link
                    href="/admin/categories/new"
                    className="bg-[#d4f238] text-black px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Categoría
                </Link>
            </div>

            <div className="soft-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="p-4 font-bold auto-text w-20">ID</th>
                                <th className="p-4 font-bold auto-text">Nombre</th>
                                <th className="p-4 font-bold auto-text text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-500">
                                        No hay categorías registradas.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr key={category.id_key} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-500">#{category.id_key}</td>
                                        <td className="p-4 font-medium auto-text">{category.name}</td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <Link
                                                href={`/admin/categories/${category.id_key}`}
                                                className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 p-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id_key)}
                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
