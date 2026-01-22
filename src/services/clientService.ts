import api from './api';
import { Client } from '../types';

export const getClients = async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('/clients');
    return response.data;
};

export const getClientByEmail = async (email: string): Promise<Client | undefined> => {
    const clients = await getClients();
    return clients.find(c => c.email === email);
};

export const getClientById = async (id: number): Promise<Client> => {
    const response = await api.get<Client>(`/clients/${id}`);
    return response.data;
};
