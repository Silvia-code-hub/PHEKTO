import React from 'react';
import ProductCard from './ProductCard';
import { products } from './ProductType';
// import './ProductGrid.css';

const ProductGrid: React.FC = () => {
  return (
    <div className="flex-wrap">
      <h1 className="font-bold text-deep-blue w-full text-center text-[42px] mb-5">Featured Products</h1> 
      <div className="flex justify-between flex-wrap">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;