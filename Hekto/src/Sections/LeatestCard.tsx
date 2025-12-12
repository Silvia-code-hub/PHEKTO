import React from "react";
import type { product } from "./LeatestItems";

import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';

interface LeatestCardProps{
     product: product;
}
const LeastCard: React.FC<LeatestCardProps> = ({ product }) =>{
    return (
        <div className=" flex flex-wrap w-[360px] h-[306px]">
            <div className="bg-cultured-white h-[269px] w-[360px] ">
            <div className="w-[223px] h-[229px] ml-10 mt-2">
                <img src={product.image} alt={product.name} />

            </div>
            <div className="gap-5 flex flex-col -mt-20 ml-4 opacity-0 hover:opacity-100">
                <span className="text-purple"><FaShoppingCart/></span>
                <span className="text-purple"><FaRegHeart/></span>
                <span className="text-purple"><FaSearchPlus/></span>
            </div>
            </div>
            <div className="h-[87px] w-[360px] bg-white gap-20 flex ">
                <h2 className="text-blue-shade w-[156px] h-[16px] font-normal text-base leading-[1.00] ">Comfort Handy Craft</h2>
                <div className=" flex gap-4 justify-end">
                <div className="text-blue-shade">${product.newprice.toFixed(2)}</div>
                <div className="text-deep-pink line-through">${product.oldprice.toFixed(2)}</div>
                </div>
                
            </div>


        </div>
    );
};
export default LeastCard;