// src/components/ProductSection.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../Sections/ProductCard';
import { type Product } from '../Services/productService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductSectionProps {
    title: string;                    
    fetchProducts: () => Promise<Product[]>;  
    itemsPerPage?: number;          
    showCarousel?: boolean;           
    showFilters?: boolean;            
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
    title, 
    fetchProducts, 
    itemsPerPage = 4,
    showCarousel = false,
    showFilters = false
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                setError(null);
            } catch (err) {
                setError('Failed to load products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [fetchProducts, itemsPerPage]);

    const nextSlide = () => {
        if (totalPages > 1) {
            setCurrentIndex((prev) => (prev + 1) % totalPages);
        }
    };

    const prevSlide = () => {
        if (totalPages > 1) {
            setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const startIndex = currentIndex * itemsPerPage;
    const visibleProducts = showCarousel 
        ? products.slice(startIndex, startIndex + itemsPerPage)
        : products;

    if (loading) {
        return (
            <div className="my-8">
                <h2 className="text-center text-[42px] font-bold text-blue-shade mb-8">
                    {title}
                </h2>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading {title}...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-8">
                <h2 className="text-center text-[42px] font-bold text-blue-shade mb-8">
                    {title}
                </h2>
                <div className="text-center text-red-500 py-10">{error}</div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="my-8">
                <h2 className="text-center text-[42px] font-bold text-blue-shade mb-8">
                    {title}
                </h2>
                <div className="text-center text-gray-500 py-10">
                    No products available
                </div>
            </div>
        );
    }

    return (
        <div className="my-8">
            <h2 className="text-center text-[42px] font-bold text-blue-shade mb-8">
                {title}
            </h2>
            
            {showFilters && (
                <div className="flex justify-center gap-5 mb-8">
                    <button className="text-blue-shade hover:text-custom-pink">New Arrival</button>
                    <button className="text-blue-shade hover:text-custom-pink">Best Seller</button>
                    <button className="text-blue-shade hover:text-custom-pink">Featured</button>
                    <button className="text-blue-shade hover:text-custom-pink">Special Offer</button>
                </div>
            )}
            
            <div className={`relative ${showCarousel ? 'px-8' : ''}`}>
                {showCarousel && totalPages > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-purple-100 z-10"
                        >
                            <FaChevronLeft className="text-purple-600 text-xl" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-purple-100 z-10"
                        >
                            <FaChevronRight className="text-purple-600 text-xl" />
                        </button>
                    </>
                )}
                
                <div className={`flex ${showCarousel ? 'justify-between' : 'justify-center'} flex-wrap gap-5`}>
                    {visibleProducts.map(product => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
                
                {showCarousel && totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-8">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'w-8 bg-pink-500'
                                        : 'w-4 bg-gray-300 hover:bg-pink-300'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSection;