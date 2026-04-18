// src/components/Top.tsx
import React from 'react';
import { getImageUrl } from '../Services/productService';


interface Category {
    name: string;
    image_url: string;
    product_count: number;
    price?: number;
}

interface TopProps {
    category: Category;  
}

const Top: React.FC<TopProps> = ({ category }) => {  
    const imageUrl = getImageUrl(category.image_url);

    return (
        <div className="w-[269px] h-[345px] bg-white">
            <div className="relative w-[269px] h-[269px] bg-cream-white rounded-full border-4 border-1-transparent hover:border-purple-main group">
                <div className="absolute inset-0 w-full h-full bg-cream-white rounded-full transform translate-x-1">
                    <div className="w-[178px] h-[178px] pt-20 pl-20">
                        <img 
                            src={imageUrl} 
                            alt={category.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            }}
                        />
                    </div>
                    <button className="bg-light-green w-[94px] h-[29px] font-medium text-xs leading-[1.00] text-white ml-20 mt-2 opacity-0 group-hover:opacity-100 transition-opacity px-2">
                        View Shop
                    </button>
                </div>
            </div>
            
            <div className="w-full h-[56px] text-center mt-2">
                <h2 className="font-normal text-blue-shade text-[20px] leading-[1.00] h-[20px]">
                    {category.name}
                </h2>
                <div className="font-normal text-[16px] h-[16px] leading-[1.00] text-blue-shade mt-3">
                    {category.product_count} Products
                </div>
            </div>
        </div>
    );
};

export default Top;