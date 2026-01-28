'use client';

import { useState } from 'react';
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

    if (typeof window !== 'undefined' && !isAuthenticated) {
        router.push('/login?redirect=/checkout');
        return null;
    }

    if (typeof window !== 'undefined' && cart.length === 0) {
        router.push('/cart');
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

            // 1. Create Address
            await createAddress({
                street: formData.street,
                number: formData.number,
                city: formData.city,
                client_id: clientId
            });

            // 2. Create Bill
            const billPayload = {
                bill_number: `BILL-${Date.now()}`, // Simple generation
                date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
                total: total,
                payment_type: parseInt(formData.paymentType),
                client_id: clientId
            };
            const bill = await createBill(billPayload);

            // 3. Create Order
            // Note: Backend OrderSchema requires bill_id. Assuming bill object has id_key.
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

            // 4. Create Order Details
            const detailPromises = cart.map(item => createOrderDetail({
                quantity: item.quantity,
                order_id: order.id_key,
                product_id: item.product.id_key
            }));

            await Promise.all(detailPromises);

            // Success
            clearCart();
            alert("¡Compra exitosa! Gracias por elegir Recirculate.");
            router.push('/profile');

        } catch (err: any) {
            console.error("Checkout Error Full:", err);
            // Try to extract backend error message if available
            const msg = err.response?.data?.detail || err.response?.data?.message || err.message || 'Error al procesar la compra.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Finalizar Compra</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Address Section */}
                <div className="bg-gray-50 p-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-4">Envío</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold uppercase mb-1">Calle</label>
                            <input name="street" value={formData.street} onChange={handleChange} required className="w-full border-gray-300 p-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Número</label>
                            <input name="number" value={formData.number} onChange={handleChange} required className="w-full border-gray-300 p-2 text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Ciudad</label>
                            <input name="city" value={formData.city} onChange={handleChange} required className="w-full border-gray-300 p-2 text-sm" />
                        </div>
                    </div>
                </div>

                {/* Payment Section */}
                <div className="bg-gray-50 p-6">
                    <h2 className="text-lg font-bold uppercase tracking-wide mb-4">Pago</h2>
                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">Método de Pago</label>
                        <select name="paymentType" value={formData.paymentType} onChange={handleChange} className="w-full border-gray-300 p-2 text-sm">
                            <option value="1">Efectivo</option>
                            <option value="2">Tarjeta</option>
                            <option value="3">Débito</option>
                            <option value="4">Crédito</option>
                            <option value="5">Transferencia</option>
                        </select>
                    </div>
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50"
                >
                    {loading ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                </button>
            </form>
        </div>
    );
}
