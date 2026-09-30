import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../Services/api';
import { useAuth } from './AuthContext';

interface WishlistItem {
    wishlist_id: number;
    product_id: number;
    name: string;
    price: number;
    old_price: number | null;
    image_url: string;
    sku: string;
    stock: number;
}

interface WishlistContextType {
    wishlistItems: WishlistItem[];
    wishlistCount: number;
    loading: boolean;
    refreshWishlist: () => Promise<void>;
    addToWishlist: (productId: number) => Promise<void>;
    removeFromWishlist: (productId: number) => Promise<void>;
    isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(false);

    const refreshWishlist = useCallback(async () => {
        if (!user) {
            setWishlistItems([]);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get(`/wishlist/user/${user.user_id}`);
            setWishlistItems(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
            setWishlistItems([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        refreshWishlist();
    }, [refreshWishlist]);

    const addToWishlist = async (productId: number) => {
        if (!user) throw new Error('Please login first');
        
        await api.post('/wishlist', {
            user_id: user.user_id,
            product_id: productId
        });
        await refreshWishlist();
    };

    const removeFromWishlist = async (productId: number) => {
        if (!user) throw new Error('Please login first');
        
        await api.delete('/wishlist', {
            data: {
                user_id: user.user_id,
                product_id: productId
            }
        });
        await refreshWishlist();
    };

    const isInWishlist = (productId: number) => {
        return wishlistItems.some(item => item.product_id === productId);
    };

    const wishlistCount = wishlistItems.length;

    return (
        <WishlistContext.Provider value={{
            wishlistItems,
            wishlistCount,
            loading,
            refreshWishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context;
};