'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tighter uppercase text-black">
              Recirculate
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/shop" className="text-gray-600 hover:text-black hover:underline transition-all text-sm uppercase tracking-wide">
              Tienda
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-black transition-all text-sm uppercase tracking-wide">
              Carrito
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-600 hover:text-black transition-all text-sm uppercase tracking-wide">
                  {user.name || 'Mi Cuenta'}
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-500 transition-all text-sm uppercase tracking-wide"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 hover:text-black transition-all text-sm uppercase tracking-wide">
                  Ingresar
                </Link>
                <Link href="/register" className="bg-black text-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-gray-800 transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-black focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <Link href="/shop" className="block px-3 py-2 text-sm text-gray-700 hover:text-black uppercase">
              Tienda
            </Link>
            <Link href="/cart" className="block px-3 py-2 text-sm text-gray-700 hover:text-black uppercase">
              Carrito
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:text-black uppercase">
                  Mi Cuenta
                </Link>
                <button onClick={logout} className="block w-full text-left px-3 py-2 text-sm text-red-500 uppercase">
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-sm text-gray-700 hover:text-black uppercase">
                  Ingresar
                </Link>
                <Link href="/register" className="block px-3 py-2 text-sm font-bold text-black uppercase">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}