'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { createAddress, createBill, createOrder, createOrderDetail } from '../../services/orderService';
import { DeliveryMethod, Status } from '../../types';

export default function CheckoutPage() {
    const { user, isAuthenticated } = useAuth();
    const { cart, total, clearCart } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState({
        street: '',
        number: '',
        city: '',
        paymentType: '1' // Default Cash (1)
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/checkout');
        } else if (cart.length === 0) {
            router.push('/cart');
        }
    }, [isAuthenticated, cart.length, router]);

    if (!isAuthenticated || cart.length === 0) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!user || !user.id_key) throw new Error("Usuario no identificado. Por favor reconecta.");

            const clientId = user.id_key;

            await createAddress({
                street: formData.street,
                number: formData.number,
                city: formData.city,
                client_id: clientId
            });

            const billPayload = {
                bill_number: `BILL-${Date.now()}`,
                date: new Date().toISOString().split('T')[0],
                total: total,
                payment_type: parseInt(formData.paymentType),
                client_id: clientId
            };
            const bill = await createBill(billPayload);

            if (!bill || !bill.id_key) throw new Error("Error al generar factura.");

            const orderPayload = {
                date: new Date().toISOString(),
                total: total,
                delivery_method: DeliveryMethod.HOME_DELIVERY,
                status: Status.PENDING,
                client_id: clientId,
                bill_id: bill.id_key
            };
            const order = await createOrder(orderPayload);

            if (!order || !order.id_key) throw new Error("Error al generar orden.");

            const detailPromises = cart.map(item => createOrderDetail({
                quantity: item.quantity,
                order_id: order.id_key,
                product_id: item.product.id_key
            }));

            await Promise.all(detailPromises);

            clearCart();
            alert("¡Compra exitosa! Gracias por elegir Recirculate.");
            router.push('/profile');

        } catch (err: any) {
            console.error("Checkout Error Full:", err);
            const msg = err.response?.data?.detail || err.response?.data?.message || err.message || 'Error al procesar la compra.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 pt-28">
            <h1 className="text-3xl font-bold uppercase tracking-tight auto-text mb-8">Finalizar Compra</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Address Section */}
                <div className="soft-card p-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide auto-text mb-6">Envío</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase mb-2 auto-text">Calle</label>
                            <input
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                required
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-2 auto-text">Número</label>
                            <input
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                required
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-2 auto-text">Ciudad</label>
                            <input
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="soft-card p-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide auto-text mb-6">Pago</h2>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-2 auto-text">Método de Pago</label>
                        <select
                            name="paymentType"
                            value={formData.paymentType}
                            onChange={handleChange}
                            className="w-full theme-input rounded-lg p-3 outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                        >
                            <option value="1">Efectivo</option>
                            <option value="2">Tarjeta</option>
                            <option value="3">Débito</option>
                            <option value="4">Crédito</option>
                            <option value="5">Transferencia</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-lg disabled:opacity-50"
                >
                    {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                </button>
            </form>
        </div>
    );
}
