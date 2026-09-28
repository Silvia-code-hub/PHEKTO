import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../Services/api';
import { getImageUrl } from '../../Services/productService';

interface Product {
    product_id: number;
    name: string;
    sku: string;
    price: number;
    old_price: number | null;
    image_url: string;
    category: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

interface DashboardStats {
    total: number;        
    active: number;       
    lowStock: number;     
    outOfStock: number;   
}

const MyProducts: React.FC = () => {

      const navigate = useNavigate();
      const { user } = useAuth();
      const [products, setProducts] = useState<Product[]>([]); 
      const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
       const [stats, setStats] = useState<DashboardStats>({           
        total: 0,
        active: 0,
        lowStock: 0,
        outOfStock: 0
    });

     const [loading, setLoading] = useState(true);
     const [error, setError] = useState('');
     const [searchTerm, setSearchTerm] = useState('');
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage] = useState(10);


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
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await api.get('/products/vendor/my-products');
                
                const productList = response.data.data;
                setProducts(productList);
                setFilteredProducts(productList);
                calculateStats(productList);
                } catch (err: any) {
                console.error('Failed to fetch products:', err);
                setError(err.response?.data?.error || 'Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    const calculateStats = (productList: Product[]) => {
        const total = productList.length;
        const active = productList.filter(p => p.quantity > 0).length;
        const lowStock = productList.filter(p => p.quantity > 0 && p.quantity < 10).length;
        const outOfStock = productList.filter(p => p.quantity === 0).length;
        
        setStats({ total, active, lowStock, outOfStock });
    };

     const handleDelete = async (productId: number, productName: string) => {
        if (window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
            try {
                await api.delete(`/products/${productId}`);

                 const updatedProducts = products.filter(p => p.product_id !== productId);
                setProducts(updatedProducts);
                setFilteredProducts(
                    searchTerm 
                        ? updatedProducts.filter(p => 
                            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.sku.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                        : updatedProducts
                );
                calculateStats(updatedProducts);
                alert('Product deleted successfully');
                } catch (err: any) {
                console.error('Delete failed:', err);
                alert(err.response?.data?.error || 'Failed to delete product');
            }
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setCurrentPage(1); 
        
        if (term === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(term) ||
                product.sku.toLowerCase().includes(term) ||
                (product.category && product.category.toLowerCase().includes(term))
            );
            setFilteredProducts(filtered);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

     const getStockStatus = (quantity: number) => {
        if (quantity === 0) {
            return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
        } else if (quantity < 10) {
            return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
        } else {
            return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p> {error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 text-sm underline hover:no-underline"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-shade">My Products</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage all your product listings in one place
                    </p>
                </div>
            
       
               <Link
                    to="/vendor/add-product"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Product
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
               
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Products</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Active Products</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Low Stock (&lt;10)</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.lowStock}</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Out of Stock</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.outOfStock}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative max-w-md">
                    <input
                        type="text"
                        placeholder="Search by product name, SKU, or category..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    />
                    <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
               
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    {searchTerm ? (
                        <>
                            <p className="text-gray-500">No products match "{searchTerm}"</p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilteredProducts(products);
                                }}
                                className="mt-2 text-pink-500 hover:underline"
                            >
                                Clear search
                            </button>
                        </>
                         ) : (
                        <>
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
                            <Link
                                to="/vendor/add-product"
                                className="inline-block bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                            >
                                Add Your First Product
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        SKU
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentProducts.map((product) => {
                                    const stockStatus = getStockStatus(product.quantity);
                                    const imageUrl = getImageUrl(product.image_url);
                                    
                                    return (
                                        <tr key={product.product_id} className="hover:bg-gray-50 transition-colors">
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img
                                                            src={imageUrl}
                                                            alt={product.name}
                                                            className="h-10 w-10 rounded-md object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {product.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {product.category || 'Uncategorized'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                           
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{product.sku}</span>
                                            </td>
                                            
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ${formatPrice(product.price)}
                                                </div>
                                                {product.old_price && (
                                                    <div className="text-sm text-gray-400 line-through">
                                                       ${formatPrice(product.old_price)}
                                                    </div>
                                                )}
                                            </td>
                                            
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-900">{product.quantity}</span>
                                            </td>
                                            
                                            
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.color}`}>
                                                    {stockStatus.text}
                                                </span>
                                            </td>
                                            
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    to={`/vendor/edit-product/${product.product_id}`}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.product_id, product.name)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                ← Prev
                            </button>
                            
                            <span className="px-4 py-1 text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                    <div className="text-center text-sm text-gray-500 mt-4">
                        Showing {currentProducts.length} of {filteredProducts.length} products
                    </div>
                </>
            )}

        </div>
    );

       
};

export default MyProducts;