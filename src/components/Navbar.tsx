'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="soft-card px-6 py-3 flex justify-between items-center backdrop-blur-md bg-white/80 dark:bg-gray-900/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4f238] rounded-lg flex items-center justify-center text-black font-bold text-lg">
              R.
            </div>
            <span className="text-xl font-bold tracking-tight auto-text">Recirculate</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-gray-100 rounded-full py-2 px-5 text-sm outline-none focus:ring-2 focus:ring-[#d4f238] transition-all text-gray-800 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-1 top-1 bg-black text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/shop" className="px-4 py-2 navbar-btn rounded-full font-medium text-sm">
            Shop
          </Link>
          <Link href="/cart" className="relative p-2 navbar-btn rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 navbar-btn rounded-full"
            aria-label="Toggle Theme"
          >
            {/* Sun Icon for Light Mode (hidden in dark) */}
            <svg className={`h-5 w-5 ${resolvedTheme === 'dark' ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {/* Moon Icon for Dark Mode (hidden in light) */}
            <svg className={`h-5 w-5 ${resolvedTheme === 'light' ? 'hidden' : 'block'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          {user && user.email === 'admin@gmail.com' && (
            <Link href="/admin" className="px-4 py-2 navbar-btn rounded-full font-bold text-sm border-2 border-[var(--primary)] text-black bg-[var(--primary)] hover:opacity-90">
              Panel Admin
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="flex items-center gap-2 navbar-btn rounded-full pl-1 pr-3 py-1 group">
                <div className="w-7 h-7 navbar-avatar-bg rounded-full flex items-center justify-center shadow-sm text-xs font-bold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-semibold group-hover:text-black">{user.name?.split(' ')[0]}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-gray-600 hover:text-black font-medium text-sm px-3 py-2">
                Login
              </Link>
              <Link href="/register" className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#d4f238] hover:text-black transition-all shadow-lg shadow-black/10">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-black focus:outline-none p-2 bg-gray-100 rounded-full">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 soft-card p-4 space-y-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <Link href="/shop" className="block px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-700 font-medium">
            Shop
          </Link>
          <Link href="/cart" className="block px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-700 font-medium">
            Cart
          </Link>
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="block w-full text-left px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-700 font-medium"
          >
            {resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          {user ? (
            <>
              <Link href="/profile" className="block px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-700 font-medium">
                My Profile ({user.name})
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <button onClick={logout} className="block w-full text-left px-4 py-3 rounded-2xl text-red-500 font-medium hover:bg-red-50">
                Log Out
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link href="/login" className="flex justify-center items-center py-3 rounded-2xl bg-gray-100 font-semibold text-gray-900">
                Login
              </Link>
              <Link href="/register" className="flex justify-center items-center py-3 rounded-2xl bg-[#d4f238] font-semibold text-black">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
