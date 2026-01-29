import api from './api';
import { Address, Order, OrderDetail, Bill } from '../types';

// Comentario: Service para gestión de órdenes, detalles de orden y facturas

// Need separate interfaces for creation payloads since they might differ from retrieval types (e.g. no IDs)
// Using 'any' for simplicity in this rapid dev phase, but ideally should be strict
// Or better: define payloads

interface CreateAddressPayload {
    street: string;
    number: string;
    city: string;
    client_id: number;
}

interface CreateBillPayload {
    bill_number: string;
    date: string; // YYYY-MM-DD
    total: number;
    payment_type: number; // Enum value
    client_id: number;
}

interface CreateOrderPayload {
    date: string; // ISO
    total: number;
    delivery_method: number; // Enum value
    status: number; // Enum value
    client_id: number;
    bill_id: number;
}

interface CreateOrderDetailPayload {
    quantity: number;
    order_id: number;
    product_id: number;
}

export const createAddress = async (payload: CreateAddressPayload): Promise<Address> => {
    const response = await api.post<Address>('/addresses', payload);
    return response.data;
};

export const createBill = async (payload: CreateBillPayload): Promise<any> => {
    const response = await api.post<any>('/bills', payload);
    return response.data;
};

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
    // API expects datetime for order date
    const response = await api.post<Order>('/orders', payload);
    return response.data;
};

export const createOrderDetail = async (payload: CreateOrderDetailPayload): Promise<OrderDetail> => {
    const response = await api.post<OrderDetail>('/order_details', payload);
    return response.data;
};

export const getOrderDetailsByOrder = async (orderId: number): Promise<OrderDetail[]> => {
    const response = await api.get<OrderDetail[]>(`/order_details/by_order/${orderId}`);
    return response.data;
};

// === HISTORIAL DE ÓRDENES ===

/**
 * Obtener todas las órdenes de un cliente
 */
export const getOrdersByClient = async (clientId: number): Promise<Order[]> => {
    // UPDATED: Use secure endpoint
    const response = await api.get<Order[]>(`/orders/by_client/${clientId}`);
    return response.data;
};

/**
 * Obtener una orden específica por ID
 */
export const getOrderById = async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
};

/**
 * Actualizar una orden (por ejemplo, para cancelar)
 */
export const updateOrder = async (id: number, data: Partial<Order>): Promise<Order> => {
    const response = await api.put<Order>(`/orders/${id}`, data);
    return response.data;
};

/**
 * Cancelar una orden (helper)
 */
export const cancelOrder = async (order: Order): Promise<Order> => {
    // Construct strict payload matching OrderSchema to avoid 500 errors
    const payload = {
        date: order.date,
        total: order.total,
        delivery_method: order.delivery_method,
        status: 4, // Status.CANCELED
        client_id: order.client_id,
        bill_id: order.bill_id
    };
    return updateOrder(order.id_key, payload);
};

// === FACTURAS ===

/**
 * Obtener todas las facturas
 */
export const getBills = async (): Promise<Bill[]> => {
    const response = await api.get<Bill[]>('/bills');
    return response.data;
};

/**
 * Obtener una factura específica por ID
 */
export const getBillById = async (id: number): Promise<Bill> => {
    const response = await api.get<Bill>(`/bills/${id}`);
    return response.data;
};
