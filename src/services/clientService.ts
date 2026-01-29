import api from './api';
import { Client, Address } from '../types';

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/clients');
    return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data;
};

export const updateClient = async (id: number, data: Partial<Client>): Promise<Client> => {
    const response = await api.put<Client>(`/clients/${id}`, data);
    return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
    await api.delete(`/clients/${id}`);
};

// Addresses
export const getAddressesByClient = async (clientId: number): Promise<Address[]> => {
    try {
        const response = await api.get<Address[]>(`/addresses/by_client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching addresses:', error);
        // Retornar array vacío en caso de error (e.g. backend no tiene endpoint address) para no romper la UI
        return [];
    }
};

export const createAddress = async (address: Omit<Address, 'id_key'>): Promise<Address> => {
    const response = await api.post<Address>('/addresses', address);
    return response.data;
};

export const updateAddress = async (id: number, address: Partial<Address>): Promise<Address> => {
    const response = await api.put<Address>(`/addresses/${id}`, address);
    return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
    await api.delete(`/addresses/${id}`);
};
