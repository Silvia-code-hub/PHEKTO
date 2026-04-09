export interface Product {
    name: string;
    sku: string;
    decription: string | null;
    price: number;
    old_price: number;
    quantity: number;
    image_url: string | null;
    category: string | null;
    created_at: string;
    updated_at: string;
}

export interface User {
    user_id: number;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    name: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;

}
export interface ApiResponse<T>
{
    success: boolean;
    message?: string;
    data: T;
    count?: number;
}