import React from 'react';
import {  type Product, getImageUrl } from '../Services/productService';

import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: any):string => {
    if (price === null || price ===undefined) return '0.00';

    const numPrice = typeof price ==='string' ? parseFloat(price) : price;
    if(isNaN(numPrice)) return '0.00';
    return numPrice.toFixed(2);
  };

  const imageUrl = getImageUrl(product.image_url);

  return (
   
    <div className="w-[270px] h-[361px] group">
      <div className="w-[270px] h-[236px] bg-cream-white relative overflow-hidden">
      <div className="flex mb-3 pt-2 pl-3 opacity-0 hover:opacity-100"> 
       <span className="bg-white rounded-full p-2 shadow-md hover:text-white transition-colors duration-300 cursor-pointer"><FaShoppingCart className='text-purple hover:text-white text-base'/></span>
       <span className="bg-white ml-2 rounded-full p-2 shadow-md  hover:text-white transition-colors duration-300 cursor-pointer"><FaRegHeart className='text-pink-500 hover:text-white text-base'/></span>
        <span className="bg-white ml-2 rounded-full p-2 shadow-md hover:text-white transition-colors duration-300 cursor-pointer"><FaSearchPlus className='text-blue-500 hover:text-white text-base'/></span>


      </div>
      <div className="w-[130px] h-[150px] ml-20 ">
        <img src={imageUrl} alt={product.name}  onError={(e) => {(e.target as HTMLImageElement).src = '/placeholder.jpg';  }}/>
        <span className="opacity-0">{product.product_id}</span>
      </div>
      <button className="bg-light-green text-white w-[94px] h-[29px] font-medium text-xs leading-[1.00] ml-20 opacity-0 hover:opacity-100 transition-opacity">View Details</button>
      </div>
      
      <div className="w-full text-center pt-3 pb-2 transition-all duration-300 group-hover:bg-purple   group-hover:text-white  ">
        <h3 className="font-bold text-lg  text-custom-pink mb-1 transition-colors duration-300 group-hover:text-white ">{product.name}</h3>
        <div className="flex justify-center gap-2 mb-2">
          
          <div className="w-6 h-1.5 rounded-full bg-green-400"></div>
          
          <div className="w-6 h-1.5 rounded-full bg-pink-400"></div>
        
          <div className="w-6 h-1.5 rounded-full bg-amber-200"></div>
        </div>
        <p className="w-full font-normal text-sm text-center text-blue-shade  group-hover:text-white  ">{product.sku}</p>
        <div className="font-normal text-sm text-blue-shade group-hover:text-white">${formatPrice(product.price)}</div>
        
      </div>
    </div>
    
  );
};

export default ProductCard;