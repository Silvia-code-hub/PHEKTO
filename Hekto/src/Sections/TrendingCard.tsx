import React from "react";
import { type TrendingProps } from "./Trending";


interface TrendingCardProps{
    product:TrendingProps
}
const TrendCard: React.FC<TrendingCardProps> = ({ product }) =>{
    return(
        <div className="w-[270px] h-[350px] bg-white ">
            
            <div className="bg-white-gray w-[247px] h-[244px]">
                <img src={product.image} alt={product.name} />

            </div>
             <div className="w-[122px] h-[48px] ">
                <h2 className="text-blue-shade font-bold text-base mx-auto">Cantilever chair</h2>
                <div className="gap-[10px] flex">
                <div className="text-blue-shade font-normal text-sm ">${product.newprice.toFixed(2)}</div>
                <div className="font-normal text-sm text-gray-500 line-through">${product.oldprice.toFixed(2)}</div>
                </div>
                
            </div>
            
                
        </div>

    )
}
export default TrendCard;