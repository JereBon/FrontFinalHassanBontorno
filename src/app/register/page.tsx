'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    telephone: ''
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(
        formData.name,
        formData.lastname,
        formData.email,
        formData.password,
        formData.telephone
      );
      router.push('/login');
    } catch (err: any) {
      console.error(err);
      setError('Error al registrarse. Verifica tus datos o intenta más tarde.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md soft-card p-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight auto-text uppercase">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Únete a la comunidad Recirculate
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold auto-text mb-2">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  placeholder="Juan"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-bold auto-text mb-2">Apellido</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                  placeholder="Pérez"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold auto-text mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-bold auto-text mb-2">Teléfono</label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                placeholder="+54 11 ..."
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold auto-text mb-2">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                placeholder="Min. 6 caracteres"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white underline transition-colors">
              ¿Ya tienes cuenta? Ingresa
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}