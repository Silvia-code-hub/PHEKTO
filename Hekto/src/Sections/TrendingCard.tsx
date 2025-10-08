import React from "react";
import { type TrendingProps } from "./Trending";
import "./TrendingCard.css"

interface TrendingCardProps{
    product:TrendingProps
}
const TrendCard: React.FC<TrendingCardProps> = ({ product }) =>{
    return(
        <div className="trend-card">
            
            <div className="product-image">
                <img src={product.image} alt={product.name} />

            </div>
             <div className="trend-info">
                <h2 className="trend-name">Cantilever chair</h2>
                <div className="trend-price">
                <div className="new-price">${product.newprice.toFixed(2)}</div>
                <div className="old-price">${product.oldprice.toFixed(2)}</div>
                </div>
                
            </div>
            
                
        </div>

    )
}
export default TrendCard;