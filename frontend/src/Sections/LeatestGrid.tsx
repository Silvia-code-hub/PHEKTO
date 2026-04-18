import React, { useEffect, useState } from "react";
import LeastCard from "./LeatestCard";
import { getLatestProducts, type Product } from "../Services/productService";

const LeastGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                setLoading(true);
                const data = await getLatestProducts();
                console.log('Latest products received:', data);
                setProducts(data);
                setFilteredProducts(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch latest products:', err);
                setError('Failed to load latest products.');
            } finally {
                setLoading(false);
            }
        };
        fetchLatestProducts();
    }, []);

    const filterProducts = (filter: string) => {
        setActiveFilter(filter);
        if (filter === 'all') {
            setFilteredProducts(products);
        } else if (filter === 'new') {
            setFilteredProducts(products.filter(p => p.is_latest === true));
        } else if (filter === 'bestseller') {
            setFilteredProducts([...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6));
        } else if (filter === 'featured') {
            setFilteredProducts(products.filter(p => p.is_featured === true));
        } else if (filter === 'special') {
            setFilteredProducts(products.filter(p => p.old_price && p.old_price > p.price));
        }
    };

    if (loading) {
        return (
            <div className="my-8">
                <h1 className="font-bold text-deep-blue text-center text-[42px] mb-5">Latest Products</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading products...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-8">
                <h1 className="font-bold text-deep-blue text-center text-[42px] mb-5">Latest Products</h1>
                <div className="text-center text-red-500 py-10">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-8">
            <p className="text-center font-bold text-[42px] text-blue-shade mb-5">Latest Products</p>
            
            <div className="flex justify-center gap-5 mb-8 flex-wrap">
                <button onClick={() => filterProducts('all')} className={`font-normal text-lg transition-all duration-300 ${activeFilter === 'all' ? 'text-pink-500 underline' : 'text-blue-600 hover:text-pink-500 hover:underline'}`}>All Products</button>
                <button onClick={() => filterProducts('new')} className={`font-normal text-lg transition-all duration-300 ${activeFilter === 'new' ? 'text-pink-500 underline' : 'text-blue-600 hover:text-pink-500 hover:underline'}`}>New Arrival</button>
                <button onClick={() => filterProducts('bestseller')} className={`font-normal text-lg transition-all duration-300 ${activeFilter === 'bestseller' ? 'text-pink-500 underline' : 'text-blue-600 hover:text-pink-500 hover:underline'}`}>Best Seller</button>
                <button onClick={() => filterProducts('featured')} className={`font-normal text-lg transition-all duration-300 ${activeFilter === 'featured' ? 'text-pink-500 underline' : 'text-blue-600 hover:text-pink-500 hover:underline'}`}>Featured</button>
                <button onClick={() => filterProducts('special')} className={`font-normal text-lg transition-all duration-300 ${activeFilter === 'special' ? 'text-pink-500 underline' : 'text-blue-600 hover:text-pink-500 hover:underline'}`}>Special Offer</button>
            </div>
            
            
            <div className="grid grid-cols-2 gap-6">
                {filteredProducts.slice(0, 6).map(product => (
                    <LeastCard key={product.product_id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default LeastGrid;