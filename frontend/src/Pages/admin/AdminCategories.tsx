import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { getImageUrl } from '../../Services/productService';

interface Category {
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    display_order: number;
    product_count: number;
}

const AdminCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [saving, setSaving] = useState(false);

    
    const [imageFile, setImageFile] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image_url: '',
        display_order: 0
    });


    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/categories');
            console.log('📥 Categories:', response.data.categories?.length || 0);
            setCategories(response.data.categories || []);
            setError('');
        } catch (err: any) {
            console.error('❌ Fetch error:', err);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    
    const openAddModal = () => {
        setEditingCategory(null);
        setFormData({ name: '', slug: '', description: '', image_url: '', display_order: 0 });
        setImageFile(null);
        setImagePreview(null);
        setShowModal(true);
    };

    const openEditModal = (cat: Category) => {
        setEditingCategory(cat);
        setFormData({
            name: cat.name,
            slug: cat.slug,
            description: cat.description || '',
            image_url: cat.image_url || '',
            display_order: cat.display_order || 0
        });
        setImageFile(null);
        setImagePreview(cat.image_url ? getImageUrl(cat.image_url) : null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCategory(null);
        setError('');
        setImageFile(null);
        setImagePreview(null);
    };

   
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setImageFile(base64);
            setImagePreview(base64);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setFormData({ ...formData, image_url: '' });
    };

   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
           
            const payload = {
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
                description: formData.description || null,
                image_url: formData.image_url || null,
                display_order: parseInt(String(formData.display_order)) || 0
            };

            console.log('📤 Saving category:', payload);

            let categoryId: number;
            if (editingCategory) {
                await api.put(`/categories/${editingCategory.category_id}`, payload);
                categoryId = editingCategory.category_id;
            } else {
                const response = await api.post('/categories', payload);
                console.log('✅ Category created:', response.data);
                categoryId = response.data.data.category_id;
            }

            
            if (imageFile) {
                setUploadingImage(true);
                console.log('📤 Uploading image to Cloudinary...');
                await api.post(`/categories/${categoryId}/upload-image`, {
                    image: imageFile
                });
                setUploadingImage(false);
                console.log('✅ Image uploaded');
            }

        
            alert(`✅ Category ${editingCategory ? 'updated' : 'created'} successfully!`);
            closeModal();
            await fetchCategories();
        } catch (err: any) {
            console.error('❌ Save error:', err);
            setError(err.response?.data?.error || 'Failed to save category');
            setUploadingImage(false);
        } finally {
            setSaving(false);
        }
    };

    
    const handleDelete = async (cat: Category) => {
        if (!window.confirm(`Delete category "${cat.name}"?`)) return;

        try {
            await api.delete(`/categories/${cat.category_id}`);
            await fetchCategories();
        } catch (err: any) {
            alert(err.response?.data?.error || 'Failed to delete category');
        }
    };

   
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        );
    }

   
    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
           
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-blue-shade">Category Management</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage product categories for your store
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Category
                </button>
            </div>

            {error && !showModal && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            
            {categories.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">📁</div>
                    <p className="text-gray-500 mb-4">No categories yet</p>
                    <button
                        onClick={openAddModal}
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
                    >
                        Create Your First Category
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((cat) => (
                                <tr key={cat.category_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {cat.image_url ? (
                                            <img
                                                src={getImageUrl(cat.image_url)}
                                                alt={cat.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                                                N/A
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                                        {cat.description && (
                                            <div className="text-xs text-gray-500 truncate max-w-xs">
                                                {cat.description}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500 font-mono">{cat.slug}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {cat.product_count} product{cat.product_count !== 1 ? 's' : ''}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cat.display_order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => openEditModal(cat)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 border-t">
                        Total: {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
                    </div>
                </div>
            )}

           
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        
                       
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-blue-shade">
                                {editingCategory ? 'Edit Category' : 'Add Category'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                                    {error}
                                </div>
                            )}

                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Living Room"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="auto-generated from name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    URL-friendly version (leave empty to auto-generate)
                                </p>
                            </div>

                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Optional description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                           
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Image
                                </label>

                               
                                {imagePreview && (
                                    <div className="mb-3 relative inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg border-2 border-pink-200"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}

                                
                                <label className="cursor-pointer block">
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                                        <div className="text-2xl mb-1">📷</div>
                                        <div className="text-sm text-gray-500">
                                            {uploadingImage
                                                ? 'Uploading...'
                                                : imagePreview
                                                ? 'Change Image'
                                                : 'Click to Upload'}
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

                              
                                <details className="mt-3">
                                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                                        Or paste image URL manually
                                    </summary>
                                    <input
                                        type="text"
                                        value={formData.image_url}
                                        onChange={(e) => {
                                            setFormData({ ...formData, image_url: e.target.value });
                                            setImagePreview(e.target.value ? getImageUrl(e.target.value) : null);
                                        }}
                                        placeholder="/uploads/categories/example.png or https://..."
                                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </details>
                            </div>

                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Lower numbers appear first
                                </p>
                            </div>

                          
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving || uploadingImage}
                                    className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 disabled:opacity-50"
                                >
                                    {saving || uploadingImage
                                        ? 'Saving...'
                                        : editingCategory
                                        ? 'Update'
                                        : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCategories;