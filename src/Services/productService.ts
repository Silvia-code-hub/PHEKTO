import api from './api';
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Product {
    product_id: number;  
    name: string;
    price: number;
    image_url: string;   
    sku: string;   
    old_price?: number;      
    description?: string;
    category?: string;
    quantity?: number;
    is_featured?: boolean;
    is_latest?: boolean;
    is_trending?: boolean;
    rating?: number;
    review_count?: number;
    created_at?: string;
}
export interface Category {
    category_id: number;
    name: string;
    slug?: string;
    image_url: string;
    display_order: number;
    product_count: number;
    description?: string;
}


export const getImageUrl = (imageUrl: string): string => {
    if (!imageUrl) return '/placeholder.jpg';
    
    
    if (imageUrl.startsWith('http')) return imageUrl;
    
    
    return `${BACKEND_URL}${imageUrl}`;
};

export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products/featured');
    return response.data.data;
};

export const getLatestProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products/latest');
    return response.data.data;
};

export const getTrendingProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products/trending');
    return response.data.data;
};
export const getTopCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories/top');
    return response.data.data;
};
export const getShopProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data.data;
};

export const getProductById = async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
};

export const getProductsByCategory = async (category: string) => {
    const response = await api.get(`/products?category=${category}`); 
    return response.data.data;
};

export const createProduct = async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data.data;
};

export const updateProduct = async (id: number, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data;
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
};