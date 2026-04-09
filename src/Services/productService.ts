import api from './api';
import { getOptimizedImageUrl } from './cloudinaryService';
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
    category_name: string;
    category_slug: string;
    image_url: string;
    display_order: number;
}


export const getImageUrl = (imageUrl: string, width?: number, height?: number): string => {
    if (!imageUrl) return '/placeholder.jpg';
    
    
    if (imageUrl.includes('cloudinary.com')) {
        return getOptimizedImageUrl(imageUrl, { width: width || 400, height: height || 400 });
    }
    if (imageUrl.startsWith('/uploads/')) {
        return `${BACKEND_URL}${imageUrl}`;
    }
    
    return imageUrl;
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data.products || response.data.data || [];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const products = await getProducts();
    return products.filter(p => p.is_featured === true);
};

export const getLatestProducts = async (): Promise<Product[]> => {
    const products = await getProducts();
    return products.filter(p => p.is_latest === true);
};

export const getTrendingProducts = async (): Promise<Product[]> => {
    const products = await getProducts();
    return products.filter(p => p.is_trending === true);
};
export const getTopCategories = async (): Promise<Category[]> => {
    const response = await api.get('/categories/top');
    return response.data.data;
};
export const getShopProducts = async (): Promise<Product[]> => {
     return getProducts();
};

export const getProductById = async (id: number): Promise<Product | null> => {
    const response = await api.get(`/products/${id}`);
    return response.data.product || response.data.data || null;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products?category=${category}`); 
    return response.data.products || response.data.data || [];
};
export const uploadProductImage = async (productId: number, base64Image: string): Promise<{ image_url: string }> => {

    const response = await api.post(`/products/${productId}/upload-image`, { 
        image: base64Image 
    });
    return response.data;
};

export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
    const response = await api.post('/products', productData);
    return response.data.data;
};

export const updateProduct = async (id: number, productData: Partial<Product>) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data;
};

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`);
};