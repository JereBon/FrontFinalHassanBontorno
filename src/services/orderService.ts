import api from './api';
import { Address, Order, OrderDetail } from '../types';

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
