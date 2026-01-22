'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '../services/productService';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Show only first 4 products for "Featured" section
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-200/50">
          {/* Abstract minimalist background or image could go here */}
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80 grayscale"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase mb-6 drop-shadow-md">
            Menos es Más
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 tracking-wide font-light drop-shadow-sm">
            Descubre nuestra colección de básicos esenciales diseñados para perdurar.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
          >
            Ver Colección
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">Nuevas Llegadas</h2>
          <Link href="/shop" className="text-sm border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors uppercase tracking-wide">
            Ver todo
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square w-full mb-4"></div>
                <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id_key} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Values Section */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">Calidad Premium</h3>
            <p className="text-gray-400 text-sm">Materiales seleccionados meticulosamente para garantizar durabilidad y confort.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">Diseño Atemporal</h3>
            <p className="text-gray-400 text-sm">Prendas que trascienden las tendencias pasajeras y se mantienen vigentes.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold uppercase mb-4 tracking-wider">Producción Ética</h3>
            <p className="text-gray-400 text-sm">Procesos de fabricación responsables con el medio ambiente y las personas.</p>
          </div>
        </div>
      </section>
    </div>
  );
}