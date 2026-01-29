'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { Category } from '@/types';

export default function NewProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category_id: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (e) {
            console.error("Failed to load categories", e);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!formData.name || !formData.price || !formData.stock || !formData.category_id) {
                throw new Error("Por favor completa los campos obligatorios.");
            }

            await createProduct({
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category_id: parseInt(formData.category_id),
                image_url: formData.image_url || undefined
            });

            router.push('/admin/products');
        } catch (err: any) {
            setError(err.message || "Error al crear producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold auto-text mb-6">Nuevo Producto</h1>

            <div className="soft-card p-8">
                {error && (
                    <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold auto-text mb-2">Nombre del Producto</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            placeholder="Ej: Camiseta Oversize"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold auto-text mb-2">Precio ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-bold auto-text mb-2">Stock Inicial</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                placeholder="0"
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold auto-text mb-2">Categoría</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            required
                        >
                            <option value="">Seleccionar Categoría...</option>
                            {categories.map(cat => (
                                <option key={cat.id_key} value={cat.id_key}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-bold auto-text mb-2">URL de Imagen (Opcional)</label>
                        <input
                            type="url"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Pega una URL de imagen válida.</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2 rounded-full theme-input hover:brightness-90 transition-all font-bold text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 rounded-full bg-[var(--primary)] text-black font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Crear Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
