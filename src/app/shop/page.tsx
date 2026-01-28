'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { Product, Category } from '../../types';
import ProductCard from '../../components/ProductCard';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching shop data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(p => p.category_id === selectedCategory)
        : products;

    return (
        <div className="bg-[#f3f4f6] min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="soft-card bg-white p-8">
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 mb-8 border-b border-gray-200 pb-4">
                        Tienda
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full md:w-64 flex-shrink-0">
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-6">Categorías</h3>
                            <ul className="space-y-3">
                                <li>
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`text-sm uppercase tracking-wide hover:text-black transition-colors ${selectedCategory === null ? 'font-bold text-black border-l-2 border-black pl-2' : 'text-gray-500'}`}
                                    >
                                        Ver Todo
                                    </button>
                                </li>
                                {categories.map(cat => (
                                    <li key={cat.id_key}>
                                        <button
                                            onClick={() => setSelectedCategory(cat.id_key)}
                                            className={`text-sm uppercase tracking-wide hover:text-black transition-colors ${selectedCategory === cat.id_key ? 'font-bold text-black border-l-2 border-black pl-2' : 'text-gray-500'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {loading ? (
                                <div className="text-center py-20 text-gray-500 uppercase tracking-widest text-sm">Cargando productos...</div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center py-20 text-gray-500 uppercase tracking-widest text-sm">No se encontraron productos en esta categoría.</div>
                            ) : (
                                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {filteredProducts.map(product => (
                                        <ProductCard key={product.id_key} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

