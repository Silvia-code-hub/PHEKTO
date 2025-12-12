import React from "react";
import {  type ShopexCardProps, shopexData } from "./ShopexType";
 


const ShopexCard: React.FC<ShopexCardProps> = ({image,title,description}) => {
    

    
    return(
        <div className="w-[270px] h-[320px] bg-white">
            <div className="w-[65px] h-[65px] text-center ml-12 mb-5">
                <img src={image} alt={title}/>

        </div>
            <h3 className="text-blue-shade font-semibold text-[22px] leading-[1.00] w-[142px] h-[22px] ml-10 mb-5">{title}</h3>
            <p className="text-gray-faint w-[217px] h-[85px] ml-5 mb-5">{description}</p>

                

            
        </div>
        
    );
    
};

const ShopexItem: React.FC = () => {
    return (
        <div className="flex-wrap">
            <h1 className="font-bold text-[42px] leading-[1.00] w-full text-center h-[42px] text-blue-shade mb-10 mt-10">What Shopex Offer!</h1>
            <div className="flex flex-wrap justify-between ">
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




