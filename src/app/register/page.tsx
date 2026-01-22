'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

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
      // Redirect handled in context (to login)
    } catch (err: any) {
      console.error(err);
      setError('Error al registrarse. Verifica tus datos o intenta más tarde.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 uppercase">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Únete a la comunidad Recirculate
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Nombre</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full rounded-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="sr-only">Apellido</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="relative block w-full rounded-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                  placeholder="Apellido"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="telephone" className="sr-only">Teléfono</label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                required
                className="relative block w-full rounded-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                placeholder="Teléfono"
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                placeholder="Contraseña (min. 6 caracteres)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 uppercase tracking-widest disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-gray-600 hover:text-black underline">
              ¿Ya tienes cuenta? Ingresa
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}