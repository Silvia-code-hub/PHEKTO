import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product, getImageUrl } from '../Services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../Services/api';
import { FaShoppingCart, FaRegHeart, FaSearchPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [adding, setAdding] = React.useState(false);

  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return '0.00';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '0.00';
    return numPrice.toFixed(2);
  };

  const imageUrl = getImageUrl(product.image_url);

  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
       await addToCart(product.product_id, 1);
      alert('Added to cart!');
    } catch (err: any) {
      console.error('Add to cart error:', err);
      alert(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Wishlist feature coming soon!');
  };

  
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product-details/${product.product_id}`);
  };

  return (
    <div className="w-[270px] h-[361px] group">
      <div className="w-[270px] h-[236px] bg-cream-white relative overflow-hidden">
        
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

       
        <div className="flex gap-2 mb-3 pt-2 pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 relative">
          
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="bg-white rounded-full p-2 shadow-md hover:bg-purple-500 transition-colors duration-300 cursor-pointer disabled:opacity-50"
            title="Add to Cart"
          >
            <FaShoppingCart className="text-purple-500 hover:text-white text-base" />
          </button>

         
          <button
            onClick={handleWishlist}
            className="bg-white rounded-full p-2 shadow-md hover:bg-pink-500 transition-colors duration-300 cursor-pointer"
            title="Add to Wishlist"
          >
            <FaRegHeart className="text-pink-500 hover:text-white text-base" />
          </button>

          
          <button
            onClick={handleViewDetails}
            className="bg-white rounded-full p-2 shadow-md hover:bg-blue-500 transition-colors duration-300 cursor-pointer"
            title="View Details"
          >
            <FaSearchPlus className="text-blue-500 hover:text-white text-base" />
          </button>
        </div>

        
        <div 
          className="w-[130px] h-[150px] ml-20 cursor-pointer"
          onClick={handleViewDetails}
        >
          <img 
            src={imageUrl} 
            alt={product.name} 
            className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
              setImageLoaded(true);
            }}
          />
        </div>

        
        <button 
          onClick={handleViewDetails}
          className="bg-light-green text-white w-[94px] h-[29px] font-medium text-xs leading-[1.00] ml-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          View Details
        </button>
      </div>
      
      
      <div 
        className="w-full text-center pt-3 pb-2 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white cursor-pointer"
        onClick={handleViewDetails}
      >
        <h3 className="font-bold text-lg text-custom-pink mb-1 transition-colors duration-300 group-hover:text-white">
          {product.name}
        </h3>
        
        
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-6 h-1.5 rounded-full bg-green-400"></div>
          <div className="w-6 h-1.5 rounded-full bg-pink-400"></div>
          <div className="w-6 h-1.5 rounded-full bg-amber-200"></div>
        </div>
        
        <p className="w-full font-normal text-sm text-center text-blue-shade group-hover:text-white transition-colors duration-300">
          {product.sku}
        </p>
        
        <div className="font-normal text-sm text-blue-shade group-hover:text-white transition-colors duration-300">
          ${formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;