import React from 'react';
import { products, type Product } from './ProductType';
import './ProductCard.css';
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
   
    <div className="product-card">
      <div className='product-container-top'>
      <div className="product-icon"> 
       <span className="product-shop-icon"><FaShoppingCart/></span>
       <span className="product-heart-icon"><FaRegHeart/></span>
        <span className="product-searchplus-icon"><FaSearchPlus/></span>


      </div>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="product-id">{product.id}</span>
      </div>
      
      </div>
      <button className="view-details-btn">View Details</button>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-code">{product.code}</p>
        <div className="product-price">${product.price.toFixed(2)}</div>
        
      </div>
    </div>
    
  );
};

export default ProductCard;