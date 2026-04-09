import React from "react";
import { type Product, getImageUrl } from "../Services/productService";
import { FaShoppingCart, FaRegHeart, FaSearchPlus } from 'react-icons/fa';

interface LeatestCardProps {
    product: Product;
}

const LeastCard: React.FC<LeatestCardProps> = ({ product }) => {
    const formatPrice = (price: any): string => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };
    
    const imageUrl = getImageUrl(product.image_url);

    return (
        
        <div className="w-[570px] h-[150px] group flex bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
           
            <div className="w-[150px] h-[150px] bg-cultured-white relative overflow-hidden flex-shrink-0">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px]">
                    <img 
                        src={imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                    />
                </div>
                
                
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-1 shadow-md hover:bg-purple-500 cursor-pointer">
                        <FaShoppingCart className="text-purple-500 hover:text-white text-xs" />
                    </div>
                    <div className="bg-white rounded-full p-1 shadow-md hover:bg-pink-500 cursor-pointer">
                        <FaRegHeart className="text-pink-500 hover:text-white text-xs" />
                    </div>
                    <div className="bg-white rounded-full p-1 shadow-md hover:bg-blue-500 cursor-pointer">
                        <FaSearchPlus className="text-blue-500 hover:text-white text-xs" />
                    </div>
                </div>
            </div>
            
            
            <div className="flex-1 flex flex-col justify-center px-4">
                <h3 className="text-black font-bold text-base hover:text-purple-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{product.sku}</p>
                <div className="flex gap-3 mt-2">
                    <span className="text-black font-medium">
                        ${formatPrice(product.price)}
                    </span>
                    {product.old_price && (
                        <span className="text-pink-500 line-through">
                            ${formatPrice(product.old_price)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeastCard;