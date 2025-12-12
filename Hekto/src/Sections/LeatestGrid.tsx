import React from "react";
import LeastCard from "./LeatestCard";
import { products } from "./LeatestItems";


const LeastGrid: React.FC = () => {
    return(
      <div className="flex-wrap ">
      <p className="w-full text-center font-bold text-[42px] h-[42px] leading-[1.00] text-blue-shade mb-5">Leatest Products</p> 
      <div className="w-full justify-center gap-5 mb-3 flex flex-wrap">
        <div><button className="w-[93px] h-[22px] font-normal text-lg leading-[1.00] text-blue-shade hover:text-custom-pink hover:underline">New Arrival</button></div>
       <div><button className="w-[93px] h-[22px] font-normal text-lg leading-[1.00] text-blue-shade hover:text-custom-pink hover:underline">Best Seller</button></div>
       <div><button className="w-[93px] h-[22px] font-normal text-lg leading-[1.00] text-blue-shade hover:text-custom-pink hover:underline">Featured</button></div>
       <div><button className="w-[102px] h-[22px] font-normal text-lg leading-[1.00] text-blue-shade hover:text-custom-pink hover:underline">Special Offer</button></div>
      </div>
      
      <div className="flex justify-between flex-wrap gap-5">
        {products.map(product => (
          <LeastCard key={product.name} product={product} />
        ))}
      </div>
     </div>
    );
};
export default LeastGrid;
