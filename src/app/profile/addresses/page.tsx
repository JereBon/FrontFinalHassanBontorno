'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAddressesByClient, createAddress, updateAddress, deleteAddress } from '@/services/clientService';
import { Address } from '@/types';
import Link from 'next/link';

export default function AddressesPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        street: '',
        number: '',
        city: '',
        state: '',
        zip_code: ''
    });

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }
        loadAddresses();
    }, [user, router, authLoading]);

    const loadAddresses = async () => {
        try {
            if (user?.id_key) {
                const data = await getAddressesByClient(user.id_key);
                setAddresses(data);
            }
        } catch (error) {
            console.error('Error loading addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (user?.id_key) {
                if (editingId) {
                    await updateAddress(editingId, formData);
                } else {
                    await createAddress({ ...formData, client_id: user.id_key });
                }
                setShowForm(false);
                setEditingId(null);
                setFormData({ street: '', number: '', city: '', state: '', zip_code: '' });
                loadAddresses();
            }
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    const handleEdit = (address: Address) => {
        setFormData({
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state || '',
            zip_code: address.zip_code || ''
        });
        setEditingId(address.id_key);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta dirección?')) {
            try {
                await deleteAddress(id);
                loadAddresses();
            } catch (error) {
                console.error('Error deleting address:', error);
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="min-h-screen pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <Link href="/profile" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver a Mi Cuenta
                    </Link>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold auto-text">Mis Direcciones</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="btn-primary"
                    >
                        {showForm ? 'Cancelar' : '+ Nueva Dirección'}
                    </button>
                </div>

                {/* Form */}
                {showForm && (
                    <div className="soft-card p-6 mb-6">
                        <h3 className="text-lg font-bold auto-text mb-4">
                            {editingId ? 'Editar Dirección' : 'Nueva Dirección'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium auto-text mb-2">Calle</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                        className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium auto-text mb-2">Número</label>
                                    <input
                                        type="text"
                                        value={formData.number}
                                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                        className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium auto-text mb-2">Ciudad</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium auto-text mb-2">Provincia/Estado</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium auto-text mb-2">Código Postal</label>
                                    <input
                                        type="text"
                                        name="zip_code"
                                        value={formData.zip_code}
                                        onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                                        className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full">
                                {editingId ? 'Actualizar' : 'Guardar'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Address List */}
                {addresses.length === 0 ? (
                    <div className="soft-card p-8 text-center">
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400">No tenés direcciones guardadas</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <div key={address.id_key} className="soft-card p-6 flex justify-between items-start">
                                <div>
                                    <p className="font-medium auto-text">{address.street} {address.number}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {address.city}, {address.state} {address.zip_code}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="navbar-btn px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded-lg"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address.id_key)}
                                        className="px-3 py-1 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
