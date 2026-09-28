import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../Services/api';
import { getImageUrl } from '../../Services/productService';

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

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        price: '',
        old_price: '',
        category: '',
        quantity: ''
    });

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    useEffect(() => {
        if (user && user.user_type === 'customer') {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(' Fetching product with ID:', id);
                const response = await api.get(`/products/${id}`);
                console.log(' Product response:', response.data);
                const product = response.data.product;
                
                setFormData({
                    name: product.name,
                    sku: product.sku,
                    description: product.description || '',
                    price: product.price.toString(),
                    old_price: product.old_price?.toString() || '',
                    category: product.category || '',
                    quantity: product.quantity.toString()
                });
                
                setImagePreview(getImageUrl(product.image_url));
                setLoading(false);
            } catch (err: any) {
                console.error(' Fetch product error:', err);
                console.error(' Error response:', err.response);
                console.error(' Error status:', err.response?.status);
                console.error(' Error data:', err.response?.data);

                setError(err.response?.data?.console.error || 
                'Failed to load this product');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        try {
            
            await api.put(`/products/${id}`, {
                name: formData.name,
                sku: formData.sku,
                description: formData.description,
                price: parseFloat(formData.price),
                old_price: formData.old_price ? parseFloat(formData.old_price) : null,
                category: formData.category,
                quantity: parseInt(formData.quantity)
            });
            
            
            if (imageFile && imageFile.startsWith('data:image')) {
                await api.post(`/products/${id}/upload-image`, { image: imageFile });
            }
            
            setSuccess('Product updated successfully!');
            setTimeout(() => navigate('/vendor/products'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to update product');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-blue-shade mb-6">Edit Product</h1>
            
            {success && (
                <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    ✅ {success}
                </div>
            )}
            
            {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                     {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                    </label>
                    <div className="flex items-center gap-4">
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                        />
                    </div>
                </div>
                
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>
                
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">SKU *</label>
                    <input
                        type="text"
                        name="sku"
                        required
                        value={formData.sku}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>
                
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                </div>
                
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price *</label>
                        <input
                            type="number"
                            name="price"
                            required
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Old Price</label>
                        <input
                            type="number"
                            name="old_price"
                            step="0.01"
                            value={formData.old_price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>
                </div>
                
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Chairs">Chairs</option>
                            <option value="Tables">Tables</option>
                            <option value="Sofas">Sofas</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Decor">Decor</option>
                            <option value="Bedroom">Bedroom</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity *</label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            min="0"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>
                </div>
                
                
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/vendor/products')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
                    >
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;