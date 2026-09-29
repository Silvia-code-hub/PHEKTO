import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../Services/productService';
import { Link } from 'react-router-dom';
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
    const navigate = useNavigate();
    const imageUrl = getImageUrl(category.image_url);

    const handleViewShop = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('View Shop clicked for category:', category.name); // Debug
        navigate('/grid');  // Navigate to Shop Grid Default
    };

    return (
        <div className="w-[269px] h-[345px] bg-white">
            <div className="relative w-[269px] h-[269px] bg-cream-white rounded-full border-4 border-transparent hover:border-purple-main group">
                <div className="absolute inset-0 w-full h-full bg-cream-white rounded-full transform translate-x-1">
                    
                    {/* Product Image */}
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

                    {/* ✅ View Shop Button — with z-index and full visibility on hover */}
                    <button
                        onClick={handleViewShop}
                        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
                                   bg-light-green w-[94px] h-[29px] font-medium text-xs 
                                   text-white opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 px-2 rounded 
                                   cursor-pointer z-20 hover:bg-green-500"
                        type="button"
                    >
                        View Shop
                        <Link to= "/Default"></Link>
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