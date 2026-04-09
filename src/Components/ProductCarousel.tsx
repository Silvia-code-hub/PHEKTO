import React, { useState, useEffect } from 'react';
import ProductCard from '../Sections/ProductCard';
import { type Product } from '../Services/productService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProductCarouselProps {
    products: Product[];
    itemsPerPage?: number;
    title?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ 
    products, 
    itemsPerPage = 4,
    title = "Featured Products"
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / itemsPerPage));
    }, [products, itemsPerPage]);

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

    if (!products || products.length === 0) {
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
                
                
                <div className="flex justify-center gap-5 overflow-hidden">
                    {visibleProducts.map((product, idx) => (
                        <div key={product.product_id} className="transition-transform duration-300">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                
                
                {totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-8">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-[3px] rounded-full transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'w-8 bg-pink-500'      
                                        : 'w-5 bg-gray-300 hover:bg-pink-300'  
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

export default ProductCarousel;