'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getClientById, updateClient } from '@/services/clientService';
import Link from 'next/link';

export default function EditProfilePage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        telephone: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        const loadProfile = async () => {
            try {
                if (user.id_key) {
                    const clientData = await getClientById(user.id_key);
                    setFormData({
                        name: clientData.name || '',
                        lastname: clientData.lastname || '',
                        email: clientData.email || '',
                        telephone: clientData.telephone || ''
                    });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user, router, authLoading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            if (user?.id_key) {
                await updateClient(user.id_key, formData);
                setMessage('Perfil actualizado correctamente');
                setTimeout(() => router.push('/profile'), 1500);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error al actualizar el perfil');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a Mi Cuenta
                    </Link>
                </div>

                <div className="soft-card p-8">
                    <h1 className="text-2xl font-bold auto-text mb-6">Editar Perfil</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div>
                                <label className="block text-sm font-medium auto-text mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-[var(--card)] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d4f238] focus:border-transparent text-[var(--foreground)]"
                                    required
                                />
                            </div>

                            {/* Apellido */}
                            <div>
                                <label className="block text-sm font-medium auto-text mb-2">Apellido</label>
                                <input
                                    type="text"
                                    value={formData.lastname}
                                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                    className="w-full px-4 py-2 bg-[var(--card)] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d4f238] focus:border-transparent text-[var(--foreground)]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium auto-text mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 bg-[var(--card)] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d4f238] focus:border-transparent text-[var(--foreground)]"
                                required
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-sm font-medium auto-text mb-2">Teléfono</label>
                            <input
                                type="tel"
                                value={formData.telephone}
                                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                className="w-full px-4 py-2 bg-[var(--card)] border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d4f238] focus:border-transparent text-[var(--foreground)]"
                            />
                        </div>

                        {/* Message */}
                        {message && (
                            <div className={`p-3 rounded-lg text-sm ${message.includes('Error') ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'}`}>
                                {message}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                            <Link href="/profile" className="flex-1 px-6 py-3 text-center navbar-btn border border-gray-200 dark:border-gray-800 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-lg font-medium transition-colors shadow-sm">
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
