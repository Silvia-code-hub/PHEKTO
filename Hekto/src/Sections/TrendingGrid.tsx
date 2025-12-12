import React from "react";
import TrendCard from "./TrendingCard";
import { products } from "./Trending";


const TrendGrid: React.FC = () => {
  return (
    <div className="">
      <h1 className="w-full h-[42px] font-bold text-[42px] text-blue-shade leading-[1.00] text-center mb-[20px]">Trending Products</h1> 
      <div className="justify-evenly flex flex-wrap gap-[20px] ">
        {products.map((product) => (
          <TrendCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendGrid;