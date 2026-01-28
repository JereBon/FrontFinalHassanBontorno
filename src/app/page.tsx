'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { getProducts } from '../services/productService';
import Link from 'next/link';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Tomamos los primeros 6 para el grid
        setFeaturedProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BENTO GRID HEADER */}


        {/* BENTO GRID MAIN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* LARGE HERO CARD - 2x2 */}
          <div className="col-span-1 md:col-span-3 soft-card p-8 md:p-12 relative overflow-hidden group">
            <div className="relative z-10 max-w-lg">
              <div className="inline-block bg-gray-100 rounded-full px-4 py-1.5 mb-6 text-xs font-bold text-gray-500 uppercase tracking-wide">
                Nueva Colección 2025
              </div>
              <h1 className="text-4xl md:text-6xl font-bold auto-text tracking-tight leading-none mb-4">
                Minimalismo <br /> <span className="text-gray-400 dark:text-gray-500">Atemporal.</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                Descubre prendas diseñadas para destacar sin hacer ruido. Calidad premium y cortes modernos.
              </p>
              <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
                Ver Todo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            {/* Abstract decorative elements */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-100 hidden md:block aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" className="w-full h-full object-cover rounded-l-3xl" alt="Hero Fashion" />
            </div>
          </div>

          {/* SIDE COLUMN */}
          <div className="col-span-1 space-y-6">

            {/* Categories Card */}
            <div className="soft-card p-6 flex flex-col">
              <h3 className="text-lg font-bold mb-5 auto-text">Categorías</h3>

              {/* Vertical Category Stack */}
              <div className="space-y-3">
                {/* Prendas Superiores */}
                <Link href="/shop?category=1" className="block relative overflow-hidden rounded-2xl group transition-transform hover:scale-105 duration-300">
                  <div className="aspect-[4/2] relative">
                    <img
                      src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
                      alt="Superiores"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm">Superiores</p>
                    </div>
                  </div>
                </Link>

                {/* Prendas Inferiores */}
                <Link href="/shop?category=2" className="block relative overflow-hidden rounded-2xl group transition-transform hover:scale-105 duration-300">
                  <div className="aspect-[4/2] relative">
                    <img
                      src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
                      alt="Inferiores"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm">Inferiores</p>
                    </div>
                  </div>
                </Link>

                {/* Abrigos */}
                <Link href="/shop?category=3" className="block relative overflow-hidden rounded-2xl group transition-transform hover:scale-105 duration-300">
                  <div className="aspect-[4/2] relative">
                    <img
                      src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
                      alt="Abrigos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm">Abrigos</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Ver Todas Button */}
              <Link href="/shop" className="block navbar-btn p-3 rounded-xl flex justify-between items-center group mt-3">
                <span className="text-sm font-medium group-hover:text-black">Ver Todas</span>
                <span className="p-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            </div>

          </div>
        </div>

        {/* SECOND ROW - PRODUCTS */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 auto-text">
            Artículos Destacados
            <span className="text-xs bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full font-bold uppercase tracking-wide">Nuevos Ingresos</span>
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-3xl h-80"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id_key} product={product} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                No hay productos destacados por el momento.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}