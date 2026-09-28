import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaFacebook, FaInstagram, FaTwitter, FaCheck } from 'react-icons/fa';
import Layout from '../Components/layout';
import api from '../Services/api';
import { getImageUrl } from '../Services/productService';
import { useAuth } from '../context/AuthContext';

interface Product {
    product_id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    old_price: number | null;
    image_url: string;
    category: string;
    quantity: number;
}

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [adding, setAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('No product ID provided');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data.product);
            } catch (err: any) {
                console.error('Failed to fetch product:', err);
                setError(err.response?.data?.error || 'Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const handleAddToCart = async () => {
        if (!user) {
            alert('Please login to add items to cart');
            navigate('/login');
            return;
        }

        if (!product) return;

        setAdding(true);
        try {
            await api.post('/carts', {
                user_id: user.user_id,
                product_id: product.product_id,
                quantity: quantity
            });
            alert('Added to cart!');
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </Layout>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <Layout>
                <div className="max-w-6xl mx-auto py-20 px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-blue-shade">
                        {error || 'Product not found'}
                    </h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
                    >
                        Back to Home
                    </button>
                </div>
            </Layout>
        );
    }

    const imageUrl = getImageUrl(product.image_url);
    const discount = product.old_price
        ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
        : 0;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <span className="hover:text-pink-500 cursor-pointer" onClick={() => navigate('/')}>Home</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-pink-500 cursor-pointer" onClick={() => navigate('/products')}>Products</span>
                    <span className="mx-2">/</span>
                    <span className="text-pink-500">{product.name}</span>
                </div>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    
                    {/* Left: Product Image */}
                    <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="max-w-full max-h-[400px] object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            }}
                        />
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col justify-center">
                        
                        {/* Product Name */}
                        <h1 className="text-3xl md:text-4xl font-bold text-blue-shade mb-3">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {Array(5).fill(null).map((_, i) => (
                                    <span key={i} className={i < 4 ? 'text-yellow-400' : 'text-gray-300'}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">(4.0)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl font-bold text-pink-500">
                                ${formatPrice(product.price)}
                            </span>
                            {product.old_price && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">
                                        ${formatPrice(product.old_price)}
                                    </span>
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                                        -{discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* SKU & Category */}
                        <div className="flex gap-4 text-sm text-gray-600 mb-4">
                            <span><strong>SKU:</strong> {product.sku}</span>
                            <span><strong>Category:</strong> {product.category || 'General'}</span>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-6">
                            {product.quantity > 0 ? (
                                <>
                                    <FaCheck className="text-green-500" />
                                    <span className="text-green-600 font-medium">
                                        In Stock ({product.quantity} available)
                                    </span>
                                </>
                            ) : (
                                <span className="text-red-600 font-medium">Out of Stock</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {product.description || 'No description available.'}
                        </p>

                        {/* Quantity Selector + Add to Cart */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100 text-lg"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 border-x font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                    className="px-4 py-2 hover:bg-gray-100 text-lg"
                                >
                                    +
                                </button>
                            </div>
                            
                            <button
                                onClick={handleAddToCart}
                                disabled={product.quantity === 0 || adding}
                                className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {adding ? 'Adding...' : 'Add to Cart'}
                                <FaRegHeart />
                            </button>
                        </div>

                        {/* Share */}
                        <div className="flex items-center gap-3 pt-4 border-t">
                            <span className="text-sm font-semibold text-blue-shade">Share:</span>
                            <div className="flex gap-2">
                                <a href="#" className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80">
                                    <FaFacebook size={14} />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:opacity-80">
                                    <FaInstagram size={14} />
                                </a>
                                <a href="#" className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:opacity-80">
                                    <FaTwitter size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-t pt-8">
                    {/* Tab Headers */}
                    <div className="flex gap-8 border-b mb-6 overflow-x-auto">
                        {['description', 'additional', 'reviews', 'video'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 font-medium capitalize whitespace-nowrap transition-colors ${
                                    activeTab === tab
                                        ? 'text-pink-500 border-b-2 border-pink-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab === 'additional' ? 'Additional Info' : tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="text-gray-700 leading-relaxed">
                        {activeTab === 'description' && (
                            <div>
                                <h3 className="text-xl font-bold text-blue-shade mb-4">Product Description</h3>
                                <p>{product.description || 'No detailed description available for this product.'}</p>
                            </div>
                        )}

                        {activeTab === 'additional' && (
                            <div>
                                <h3 className="text-xl font-bold text-blue-shade mb-4">Additional Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="font-medium">SKU:</span> {product.sku}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="font-medium">Category:</span> {product.category || 'General'}
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="font-medium">Stock:</span> {product.quantity} units
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="font-medium">Price:</span> ${formatPrice(product.price)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-xl font-bold text-blue-shade mb-4">Customer Reviews</h3>
                                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                            </div>
                        )}

                        {activeTab === 'video' && (
                            <div>
                                <h3 className="text-xl font-bold text-blue-shade mb-4">Product Video</h3>
                                <p className="text-gray-500">No video available for this product.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;