import React from "react";
import {  type ShopexCardProps, shopexData } from "./ShopexType";
import "./ShopexCard.css";


const ShopexCard: React.FC<ShopexCardProps> = ({image,title,description}) => {
    

    
    return(
        <div className="shopex-card">
            <div className="shopex-image">
                <img src={image} alt={title}/>

        </div>
            <h3 className="shopex-card-title">{title}</h3>
            <p className="shopex-card-description">{description}</p>

                

            
        </div>
        
    );
    
};

const ShopexItem: React.FC = () => {
    return (
        <div className="shopex-container">
            <h1 className="shopex-subtitle">What Shopex Offers!</h1>
            <div className="shopex-grid">
                {shopexData.map((item, index) => (
                    <ShopexCard 
                        key={index}
                        image={item.image} 
                        title={item.title} 
                        description={item.description} 
                    />
                ))}
            </div>
        </div>
    );
};


export default ShopexItem;




