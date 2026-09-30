import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Layout from '../Components/layout';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../Services/productService';

const Wishlist: React.FC = () => {
    const navigate = useNavigate();
    const { wishlistItems, removeFromWishlist, loading } = useWishlist();
    const { addToCart } = useCart();

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const handleMoveToCart = async (productId: number) => {
        try {
            await addToCart(productId, 1);
            await removeFromWishlist(productId);
            alert('Moved to cart!');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to add to cart');
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-blue-shade mb-2">My Wishlist</h1>
                <p className="text-gray-500 mb-6">Products you've saved for later</p>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <div className="text-6xl mb-4">❤️</div>
                        <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                        <Link
                            to="/products"
                            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => {
                            const imageUrl = getImageUrl(item.image_url);

                            return (
                                <div key={item.wishlist_id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                                    
                                    <div
                                        className="bg-gray-100 h-56 relative cursor-pointer overflow-hidden"
                                        onClick={() => navigate(`/product-details/${item.product_id}`)}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                            }}
                                        />

                                       
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFromWishlist(item.product_id);
                                            }}
                                            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition-colors"
                                            title="Remove from wishlist"
                                        >
                                            <FaTrash className="text-red-500 hover:text-white text-sm" />
                                        </button>
                                    </div>

                                    
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-blue-shade mb-1 truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-2">SKU: {item.sku}</p>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xl font-bold text-pink-500">
                                                ${formatPrice(item.price)}
                                            </span>
                                            {item.old_price && (
                                                <span className="text-gray-400 line-through text-sm">
                                                    ${formatPrice(item.old_price)}
                                                </span>
                                            )}
                                        </div>

                                        
                                        <button
                                            onClick={() => handleMoveToCart(item.product_id)}
                                            disabled={item.stock === 0}
                                            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <FaShoppingCart size={12} />
                                            {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Wishlist;