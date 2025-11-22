import React from 'react';
import ProductCard from './ProductCard';
import { products } from './ProductType';
import './ProductGrid.css';

const ProductGrid: React.FC = () => {
  return (
    <div className="product-grid-container">
      <h1 className="page-title">Featured Products</h1> 
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;