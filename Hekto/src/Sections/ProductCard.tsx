import React from 'react';
import {  type Product } from './ProductType';
// import './ProductCard.css';
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
   
    <div className="w-[270px] h-[361px] ">
      <div className="w-[270px] h-[236px] bg-cream-white">
      <div className="flex mb-3 pt-2 pl-3 opacity-0 hover:opacity-100"> 
       <span className="text-purple mr-2"><FaShoppingCart/></span>
       <span className="product-heart-icon"><FaRegHeart/></span>
        <span className="product-searchplus-icon"><FaSearchPlus/></span>


      </div>
      <div className="w-[130px] h-[150px] ml-20 ">
        <img src={product.image} alt={product.name} />
        <span className="opacity-0">{product.id}</span>
      </div>
      <button className="bg-light-green text-white w-[94px] h-[29px] font-medium text-xs leading-[1.00] ml-20 opacity-0 hover:opacity-100 ">View Details</button>
      </div>
      
      <div className="w-full text-center hover:bg-purple hover:text-white ">
        <h3 className="font-bold text-lg  text-custom-pink hover:text-white ">{product.name}</h3>
        <p className="w-full font-normal text-sm text-center text-blue-shade hover:text-white  ">{product.code}</p>
        <div className="font-normal text-sm text-blue-shade hover:text-white">${product.price.toFixed(2)}</div>
        
      </div>
    </div>
    
  );
};

export default ProductCard;