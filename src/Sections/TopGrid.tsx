import React, { useEffect, useState } from 'react';
import Top from "./Top";
import { getTopCategories, type Category } from '../Services/productService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TopGrid: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4; 
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTopCategories = async () => {
            try {
                setLoading(true);
                const data = await getTopCategories();
                console.log('Top categories loaded:', data.length);
                setCategories(data);
                
                const pages = Math.ceil(data.length / itemsPerPage);
                setTotalPages(pages > 0 ? pages : 1);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        };
        
        fetchTopCategories();
    }, []);

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
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
        return (
            <div className="flex-wrap my-8">
                <h2 className="w-full text-center font-bold text-[42px] text-blue-shade mb-7">
                    Top Categories
                </h2>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading categories...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-wrap my-8">
                <h2 className="w-full text-center font-bold text-[42px] text-blue-shade mb-7">
                    Top Categories
                </h2>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex-wrap my-8">
                <h2 className="w-full text-center font-bold text-[42px] text-blue-shade mb-7">
                    Top Categories
                </h2>
                <div className="text-center text-gray-500 py-10">
                    No categories available
                </div>
            </div>
        );
    }

    return (
        <div className="flex-wrap my-8 justify-evenly">
            <h2 className="w-full text-center font-bold text-[42px] text-blue-shade mb-7">
                Top Categories
            </h2>
            
            <div className="relative px-8 rounded-xl py-6 shadow-sm">
                
                {totalPages > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-purple-100 transition-all duration-300 z-10 cursor-pointer"
                            aria-label="Previous"
                        >
                            <FaChevronLeft className="text-purple-600 text-xl" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-purple-100 transition-all duration-300 z-10 cursor-pointer"
                            aria-label="Next"
                        >
                            <FaChevronRight className="text-purple-600 text-xl" />
                        </button>
                    </>
                )}
                
                
                <div className="flex justify-between flex-wrap gap-5">
                    {visibleCategories.map(category => (
                        <Top 
                            key={category.category_id} 
                            category={category} 
                        />
                    ))}
                </div>
                
               
                {totalPages > 1 && (
                    <div className="flex justify-center gap-3 mt-8">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    currentIndex === idx
                                        ? 'w-6 bg-pink-500'      
                                        : 'w-4 bg-gray-300 hover:bg-pink-400 hover:w-5'  
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            
            {import.meta.env.DEV && (
                <div className="text-center text-xs text-gray-400 mt-4">
                    Total Categories: {categories.length} | Page {currentIndex + 1} of {totalPages}
                </div>
            )}
        </div>
    );
};

export default TopGrid;