'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/services/productService';
import { getCategories } from '@/services/categoryService';
import { Category } from '@/types';

// En Next.js 15+, params es una promesa en componentes de servidor, 
// pero en 'use client' todavía podemos usarlos, aunque la recomendación varía.
// Usaremos React.use() para desenvolver params si es necesario o props directas si Next lo pasa.
// Para seguridad en app router modernas:
export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Desempaquetar params usando hook 'use' (React 19/Next 15 pattern) o await directo si fuera server component.
    // Como es client component, params llega como promesa en versiones recientes.
    // Solución compatible:
    const resolvedParams = use(params);
    const productId = parseInt(resolvedParams.id);

    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category_id: '',
        image_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [productData, categoryData] = await Promise.all([
                getProductById(productId),
                getCategories()
            ]);

            setCategories(categoryData);
            setFormData({
                name: productData.name,
                price: productData.price.toString(),
                stock: productData.stock.toString(),
                category_id: productData.category_id ? productData.category_id.toString() : '',
                image_url: productData.image_url || ''
            });
        } catch (e) {
            console.error("Failed to load data", e);
            setError("Error al cargar el producto. Puede que no exista.");
        } finally {
            setLoading(false);
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
        setSaving(true);
        setError('');

        try {
            if (!formData.name || !formData.price || !formData.stock || !formData.category_id) {
                throw new Error("Por favor completa los campos obligatorios.");
            }

            await updateProduct(productId, {
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category_id: parseInt(formData.category_id),
                image_url: formData.image_url || undefined
            });

            router.push('/admin/products');
        } catch (err: any) {
            setError(err.message || "Error al actualizar producto");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold auto-text mb-6">Editar Producto</h1>

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
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-bold auto-text mb-2">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
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
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                    placeholder="https://..."
                                />
                                <p className="text-xs text-gray-500 mt-1">Pega una URL válida.</p>
                            </div>
                            {/* Preview */}
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border theme-input flex-shrink-0 flex items-center justify-center">
                                {formData.image_url ? (
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                    <span className="text-xs text-gray-400">Sin img</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2 rounded-full theme-input hover:brightness-90 transition-all font-bold text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 rounded-full bg-[var(--primary)] text-black font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                        >
                            {saving ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
