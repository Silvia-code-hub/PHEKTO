import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { type Product } from './ProductType';
import { getFeaturedProducts } from '../Services/productService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4; 
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                const data = await getFeaturedProducts();
                console.log(' Featured products received:', data);
                console.log(' Number of products:', data.length);
                setProducts(data);
                setError(null);
                
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                console.log(' itemsPerPage:', itemsPerPage);
                console.log(' Total pages calculated:', totalPages);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    
    const startIndex = currentIndex * itemsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="flex-wrap">
                <h1 className="font-bold text-deep-blue w-full text-center text-[42px] mb-5">
                    Featured Products
                </h1>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-wrap">
                <h1 className="font-bold text-deep-blue w-full text-center text-[42px] mb-5">
                    Featured Products
                </h1>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex-wrap">
                <h1 className="font-bold text-deep-blue w-full text-center text-[42px] mb-5">
                    Featured Products
                </h1>
                <div className="text-center text-gray-500 py-10">
                    No products available
                </div>
            </div>
        );
    }

    return (
        <div className="flex-wrap">
            <h1 className="font-bold text-deep-blue w-full text-center text-[42px] mb-5">
                Featured Products
            </h1>
            
            <div className="relative">
                
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-purple-100 transition-colors z-10"
                            aria-label="Previous"
                        >
                            <FaChevronLeft className="text-purple-600" />
                        </button>
                        
                        <button
                            onClick={nextSlide}
                            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-purple-100 transition-colors z-10"
                            aria-label="Next"
                        >
                            <FaChevronRight className="text-purple-600" />
                        </button>
                    </>
                )}
                
               
                <div className="flex justify-between flex-wrap">
                    {visibleProducts.map(product => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
                
                
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-[4px] rounded-full transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'w-6 bg-pink-500'      
                                        : 'w-3 bg-pink-200'       
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;