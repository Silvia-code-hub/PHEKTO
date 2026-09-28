import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../Services/api';
import { useAuth } from './AuthContext';

interface CartItem {
    cart_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    old_price: number | null;
    image_url: string;
    sku: string;
    stock: number;
}

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    cartTotal: number;
    loading: boolean;
    refreshCart: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (cartId: number, quantity: number) => Promise<void>;
    removeItem: (cartId: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const refreshCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get(`/carts/user/${user.user_id}`);
            setCartItems(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        refreshCart();
    }, [refreshCart]);

    const addToCart = async (productId: number, quantity: number) => {
        if (!user) throw new Error('Please login first');
        
        await api.post('/carts', {
            user_id: user.user_id,
            product_id: productId,
            quantity
        });
        
        await refreshCart();
    };

    const updateQuantity = async (cartId: number, quantity: number) => {
        await api.put(`/carts/${cartId}`, { quantity });
        await refreshCart();
    };

    const removeItem = async (cartId: number) => {
        await api.delete(`/carts/${cartId}`);
        await refreshCart();
    };

    const clearCart = async () => {
        if (!user) return;
        await api.delete(`/carts/clear/${user.user_id}`);
        await refreshCart();
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + parseFloat(String(item.price)) * item.quantity,
        0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            loading,
            refreshCart,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};