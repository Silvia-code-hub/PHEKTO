import React, { useEffect, useState } from 'react';
import Layout from "../Components/layout";
import { getImageUrl, getProducts } from "../Services/productService";
import { FaShoppingCart, FaRegHeart, FaSearchPlus, FaTh, FaThList } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Product {
    product_id: number;
    name: string;
    price: number;
    old_price?: number;
    image_url: string;
    sku: string;
}

const Default: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('name');
    const [itemsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
                setFilteredProducts(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];
        filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
        
        if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price_low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_high') {
            filtered.sort((a, b) => b.price - a.price);
        }
        
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [sortBy, priceRange, products]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    if (loading) {
        return (
            <Layout>
                <div className="w-full px-4 py-8">
                    <div className="text-center py-20 text-lg">Loading products...</div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="w-full px-4 py-8">
                    <div className="text-center text-red-500 py-20">{error}</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
           
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
               
               
                <div className="breadcrumb mb-6 bg-off-white pb-40 pt-20 pl-5 w-full">
                    <h1 className="text-3xl font-bold text-blue-shade mb-2">Shop Grid Default</h1>
                    <div className="flex gap-2 text-sm text-black mt-5">
                        <span>Home .</span>
                        <span>Pages .</span>
                        <span className="text-pink-500">Shop Grid Default</span>
                    </div>
                </div>

                
                <div className="header-section flex justify-between items-center mb-8 flex-wrap gap-4 w-full">
                    <div>
                        <h2 className="text-xl font-semibold text-blue-shade">
                            Ecommerce Accessories & Fashion item
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            About {filteredProducts.length} results (0.62 seconds)
                        </p>
                    </div>
                    <div className="flex gap-4 items-center flex-wrap">
                        <span className='text-blue-600'>Per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setCurrentPage(1)}
                            className="border rounded px-3 py-1 text-sm"
                        >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                        </select>   
                        <span className="text-sm text-blue-600">Sort By:</span>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded px-3 py-1 text-sm"
                        >
                            <option value="name">Sort by name</option>
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
                        </select>
                        <span className="text-sm text-blue-600">View all</span>
                        
                        <div className="flex gap-2 border-l pl-4 ml-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${
                                    viewMode === 'grid' 
                                        ? 'bg-gray-500 text-white' 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                                aria-label="Grid view"
                            >
                                <FaTh className="text-sm" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${
                                    viewMode === 'list' 
                                        ? 'bg-gray-500 text-white' 
                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                                aria-label="List view"
                            >
                                <FaThList className="text-sm" />
                            </button>
                        </div>
                    </div>
                </div>

                
                <div className="w-full">
                    
                    {viewMode === 'grid' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-5 lg:gap-6">
                            {visibleProducts.map((product) => {
                                const imageUrl = getImageUrl(product.image_url);

                                return (
                                    <div key={product.product_id} className="product-card group bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                                        <div className="image-container relative bg-gray-100 h-64 rounded-t-lg overflow-hidden">
                                            <img 
                                                src={imageUrl} 
                                                alt={product.name}
                                                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                                }}
                                            />
                                            
                                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white rounded-full p-2 shadow-md hover:bg-purple-500 cursor-pointer transition-colors">
                                                    <FaShoppingCart className="text-purple-500 hover:text-white text-sm" />
                                                </div>
                                                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer transition-colors">
                                                    <FaRegHeart className="text-pink-500 hover:text-white text-sm" />
                                                </div>
                                                <div className="bg-white rounded-full p-2 shadow-md cursor-pointer transition-colors">
                                                    <FaSearchPlus className="text-blue-500 hover:text-white text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="product-info p-4 text-center">
                                            <h3 className="font-semibold text-base text-blue-shade hover:text-pink-500 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mt-1">{product.sku}</p>
                                            
                                            <div className="flex justify-center gap-1 mt-2">
                                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                                <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                            </div>
                                            
                                            <div className="pricing mt-2 flex justify-center gap-2">
                                                <span className="text-blue-shade font-bold">
                                                    ${formatPrice(product.price)}
                                                </span>
                                                {product.old_price && (
                                                    <span className="text-pink-500 line-through text-sm">
                                                        ${formatPrice(product.old_price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* List View */}
                    {viewMode === 'list' && (
                        <div className="flex flex-col gap-4 w-full">
                            {visibleProducts.map((product) => {
                                const imageUrl = getImageUrl(product.image_url);
                                
                                return (
                                    <div key={product.product_id} className="product-card-list group bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex p-4 gap-4 w-full">
                                        <div className="image-container relative bg-gray-100 w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                            <img 
                                                src={imageUrl} 
                                                alt={product.name}
                                                className="w-full h-full object-contain p-2"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = '/placeholder.jpg';
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="product-info-list flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg text-blue-shade hover:text-pink-500 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-1">{product.sku}</p>
                                                
                                                <div className="flex gap-1 mt-2">
                                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                                    <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="pricing flex gap-2">
                                                    <span className="text-blue-shade font-bold text-lg">
                                                        ${formatPrice(product.price)}
                                                    </span>
                                                    {product.old_price && (
                                                        <span className="text-pink-500 line-through text-sm">
                                                            ${formatPrice(product.old_price)}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex gap-2">
                                                    <div className="bg-white rounded-full p-2 shadow-md hover:bg-purple-500 cursor-pointer transition-colors">
                                                        <FaShoppingCart className="text-purple-500 hover:text-white text-sm" />
                                                    </div>
                                                    <div className="bg-white rounded-full p-2 shadow-md cursor-pointer transition-colors">
                                                        <FaRegHeart className="text-pink-500 hover:text-white text-sm" />
                                                    </div>
                                                    <div className="bg-white rounded-full p-2 shadow-md cursor-pointer transition-colors">
                                                        <FaSearchPlus className="text-blue-500 hover:text-white text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination flex justify-center gap-2 mt-8">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 rounded-full border hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <FaChevronLeft className="mx-auto text-sm" />
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-8 h-8 rounded-full border hover:bg-pink-500 hover:text-white transition-colors ${
                                            currentPage === pageNum ? 'bg-pink-500 text-white' : ''
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 rounded-full border hover:bg-pink-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <FaChevronRight className="mx-auto text-sm" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Advertisement - Full width */}
                <div className="advertisement mt-12 w-full">
                    <img 
                        src={getImageUrl('/uploads/products/image_015.png')} 
                        alt="Advertisement"
                        className="w-full rounded-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Default;