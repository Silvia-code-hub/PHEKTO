import React from "react";
import TrendCard from "./TrendingCard";
import { products } from "./Trending";
import "./TrendingGrid.css"

const TrendGrid: React.FC = () => {
  return (
    <div className="trend-grid-container">
      <h1 className="trend-subtitle">Trending Products</h1> 
      <div className="trend-grid">
        {products.map((product) => (
          <TrendCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendGrid;