import React from "react";
import LeastCard from "./LeatestCard";
import { products } from "./LeatestItems";
import "./LeatestGrid.css"

const LeastGrid: React.FC = () => {
    return(
      <div className="least-grid-container">
      <p className="page-subtitle">Leatest Products</p> 
      <div className="page-button">
        <div><button className="nav-link">New Arrival</button></div>
       <div><button className="nav-link">Best Seller</button></div>
       <div><button className="nav-link">Featured</button></div>
       <div><button className="nav-link">Special Offer</button></div>
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <LeastCard key={product.name} product={product} />
        ))}
      </div>
     </div>
    );
};
export default LeastGrid;
