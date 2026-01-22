export interface User {
    email: string;
    name?: string;
    lastname?: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface BaseEntity {
    id_key: number;
}

export interface Category extends BaseEntity {
    name: string;
}

export interface Product extends BaseEntity {
    name: string;
    price: number;
    stock: number;
    category_id: number;
    category?: Category;
}

export interface Address extends BaseEntity {
    street: string;
    number: string;
    city: string;
    params?: string;
}

export enum DeliveryMethod {
    DRIVE_THRU = 1,
    ON_HAND = 2,
    HOME_DELIVERY = 3,
}

export enum Status {
    PENDING = 1,
    IN_PROGRESS = 2,
    DELIVERED = 3,
    CANCELED = 4,
}

export interface Order extends BaseEntity {
    date: string;
    total: number;
    delivery_method: DeliveryMethod;
    status: Status;
    client_id: number;
    bill_id: number;
}

export interface OrderDetail extends BaseEntity {
    quantity: number;
    price?: number;
    order_id: number;
    product_id: number;
    product?: Product;
}

export interface Client extends BaseEntity {
    name?: string;
    lastname?: string;
    email?: string;
    telephone?: string;
    orders?: Order[];
    addresses?: Address[];
}
