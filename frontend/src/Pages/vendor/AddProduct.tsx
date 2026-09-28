import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../Services/api';

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');
    const [ success, setSuccess] = useState(' ');

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

    if (user && user.user_type === 'customer') {
        navigate('/');
        return null;
    }


const handleChange = (e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleImageChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];

     if (file) {

         if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }

         if (file.size > 5 * 1024 * 1024) {
                setError('Image must be less than 5MB');
                return;
            }
        
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
        setLoading(true);
        setError(' ');
        setSuccess(' ');

        try{

            if (!formData.name || !formData.sku || !formData.price || !formData.quantity) {
                throw new Error('Please fill in all required fields');
            }
            
            if (parseFloat(formData.price) <= 0) {
                throw new Error('Price must be greater than 0');
            }
            
            if (parseInt(formData.quantity) < 0) {
                throw new Error('Quantity cannot be negative');
            }

             const productResponse = await api.post('/products', {
                name: formData.name,
                sku: formData.sku,
                description: formData.description,
                price: parseFloat(formData.price),           
                old_price: formData.old_price ? parseFloat(formData.old_price) : null,
                category: formData.category,
                quantity: parseInt(formData.quantity)        
            });

             const productId = productResponse.data.data.product_id;

             if (imageFile) {
                await api.post(`/products/${productId}/upload-image`, { 
                    image: imageFile 
                });
            }

             setSuccess('Product added successfully!');
             setTimeout(() => {
                navigate('/vendor/products');
            }, 4000);
            
        } catch (error: any) {
            setError(error.response?.data?.error || error.message || 'Failed to add product');

        } finally {
            setLoading(false);
        }
     };

     return (
        <div className='max-w-4xl mx-auto py-8 px-4'>
            <h1 className='text-2xl font-bold text-blue-shade mb-2'>Add New Product</h1>
            <p className='text-gray-500 mb-6'> Fill in the details below to add a new product to your store.
            <span className='text-gray-500'>*</span>indicates required fields.</p>

            {success && (
                <div className='bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>
                     {success}
                </div>
            )}

            {error && (
                <div className='bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
                     {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                    </label>
                    <div className='flex items-center gap-4 flex-wrap'>
                        {imagePreview && (
                            <div className="relative">
                                <img 
                                    src={imagePreview} 
                                    alt="Product preview" 
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-pink-200"
                                /> 
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        setImageFile(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        <label className="cursor-pointer">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                                <div className="text-2xl mb-1">📷</div>
                                <div className="text-sm text-gray-500">
                                    {imagePreview ? 'Change Image' : 'Click to Upload'}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    PNG, JPG, GIF up to 5MB
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., 'Ergonomic Mesh Office Chair'"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        This is what customers will see on product cards and search results.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        SKU (Stock Keeping Unit) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="sku"
                        required
                        value={formData.sku}
                        onChange={handleChange}
                        placeholder="e.g., 'CHR-001'"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Unique identifier for inventory management. Must be different for each product.
                    </p>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your product in detail... Features, materials, dimensions, care instructions, etc."
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Good descriptions help customers make purchasing decisions and reduce returns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Price <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                name="price"
                                required
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="49.99"
                                className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Current selling price in USD.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Old Price (Optional)
                        </label>
                        <div className="relative mt-1">
                            <span className="absolute left-3 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                name="old_price"
                                step="0.01"
                                min="0"
                                value={formData.old_price}
                                onChange={handleChange}
                                placeholder="99.99"
                                className="pl-7 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Original price to show discount (e.g., "Was $99.99, Now $49.99").
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        >
                            <option value="">Select a category</option>
                            <option value="Chairs">Chairs</option>
                            <option value="Tables">Tables</option>
                            <option value="Sofas">Sofas</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Decor">Decor</option>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Office">Office</option>
                            <option value="Outdoor">Outdoor</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Helps customers find your product by browsing categories.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Quantity <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            required
                            min="0"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="100"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Number of items available in stock. Shows "Out of Stock" when zero.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    
                    <button
                        type="button"
                        onClick={() => navigate('/vendor/products')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    
                   
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding Product...
                            </>
                        ) : (
                            'Add Product'
                        )}
                    </button>
                </div>

            </form>


        </div>
     );
} ;

export default AddProduct;