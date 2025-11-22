import React from "react";
import type { product } from "./LeatestItems";
import "./LeatestCard.css";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';

interface LeatestCardProps{
     product: product;
}
const LeastCard: React.FC<LeatestCardProps> = ({ product }) =>{
    return (
        <div className="least-card">
            
            <div className="product-image">
                <img src={product.image} alt={product.name} />

            </div>
            <div className="least-icons">
                <FaShoppingCart/>
                <FaRegHeart/>
                <FaSearchPlus/>
            </div>
            <div className="least-info">
                <h2 className="least-name">Comfort Handy Craft</h2>
                <div className="least-price">
                <div className="new-price">${product.newprice.toFixed(2)}</div>
                <div className="old-price">${product.oldprice.toFixed(2)}</div>
                </div>
                
            </div>


        </div>
    );
};
export default LeastCard;