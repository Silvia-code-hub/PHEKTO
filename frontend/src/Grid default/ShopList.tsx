import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "../Components/layout";
import { FaShoppingCart, FaRegHeart, FaSearchPlus, FaStar, FaStarHalfAlt, FaTh, FaThList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getProducts, getImageUrl, type Product } from '../Services/productService';



const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

// ============================================
// LIST ITEM COMPONENT
// ============================================
const ProductListItem: React.FC<{
  product: Product;
  onAddToCart: (id: number) => void;
  onViewDetails: (id: number) => void;
  onWishlist: () => void;
  adding: boolean;
}> = ({ product, onAddToCart, onViewDetails, onWishlist, adding }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const imageUrl = getImageUrl(product.image_url);

  const formatPrice = (price: any): string => {
    if (price === null || price === undefined) return '0.00';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-100 transition-all duration-300 overflow-hidden mb-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-[270px] bg-gray-100 flex-shrink-0">
          <div
            className="aspect-square sm:aspect-auto sm:h-[220px] w-full overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => onViewDetails(product.product_id)}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.jpg';
                setImageLoaded(true);
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2 mb-2">
            <h3
              className="text-lg sm:text-xl font-bold text-gray-800 hover:text-pink-500 transition-colors cursor-pointer"
              onClick={() => onViewDetails(product.product_id)}
            >
              {product.name}
            </h3>

            <div className="flex gap-1.5">
              <span className="w-5 h-5 rounded-full border border-gray-300 bg-blue-500 shadow-sm" />
              <span className="w-5 h-5 rounded-full border border-gray-300 bg-pink-500 shadow-sm" />
              <span className="w-5 h-5 rounded-full border border-gray-300 bg-green-500 shadow-sm" />
            </div>
          </div>

          {/* Price & Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                ${formatPrice(product.price)}
              </span>
              {product.old_price && (
                <span className="text-pink-500 line-through text-sm sm:text-base">
                  ${formatPrice(product.old_price)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating || 4} />
              <span className="text-gray-500 text-sm ml-1">(4.0)</span>
            </div>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 sm:line-clamp-none">
            {product.description || 'No description available.'}
          </p>

          {/* ✅ CLICKABLE ICONS */}
          <div className="flex gap-3">
            <button
              onClick={() => onAddToCart(product.product_id)}
              disabled={adding}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 ${
                hovered ? 'bg-purple-100 text-purple-500' : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-500'
              }`}
              aria-label="Add to cart"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
            <button
              onClick={onWishlist}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                hovered ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-500'
              }`}
              aria-label="Add to wishlist"
              title="Add to Wishlist"
            >
              <FaRegHeart className="text-sm" />
            </button>
            <button
              onClick={() => onViewDetails(product.product_id)}
              className={`p-2 rounded-full transition-all duration-300 cursor-pointer ${
                hovered ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-500'
              }`}
              aria-label="Quick view"
              title="View Details"
            >
              <FaSearchPlus className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ShopList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [addingId, setAddingId] = useState<number | null>(null);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setSortedProducts(data);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

 
  useEffect(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  }, [sortBy, products]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ============================================
  // HANDLERS
  // ============================================
  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    setAddingId(productId);
    try {
      await addToCart(productId, 1);
      alert('Added to cart!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAddingId(null);
    }
  };

  const handleViewDetails = (productId: number) => {
    navigate(`/product-details/${productId}`);
  };

  const handleWishlist = () => {
    alert('Wishlist feature coming soon!');
  };

  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </Layout>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <div className="text-center text-red-500 py-20">{error}</div>
        </Layout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        
        <div className="bg-[#f6f5ff] py-12 sm:py-16 mb-8 sm:mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#101750] mb-3 sm:mb-4">
              Shop List
            </h1>
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-[#101750] hover:text-pink-500 font-semibold transition">
                Home
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-[#101750] font-semibold">Pages</span>
              <span className="text-gray-400">•</span>
              <span className="text-pink-500 font-semibold">Shop List</span>
            </div>
          </div>
        </div>

       
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                Ecommerce Accessories & Fashion item
              </h2>
              <p className="text-gray-500 text-sm">
                About {sortedProducts.length} results
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-an-blue text-sm">Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-pink-500"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-an-blue text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-pink-500"
                >
                  <option value="name">Sort by name</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              <div className="flex gap-2 border-l border-gray-300 pl-3 ml-1">
                <h3 className='text-an-blue font-semibold'>View:</h3>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  aria-label="Grid view"
                >
                  <FaTh className="text-sm" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-blue-800 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  aria-label="List view"
                >
                  <FaThList className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'list' ? (
            <div>
              {paginatedProducts.map((product) => (
                <ProductListItem
                  key={product.product_id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  onWishlist={handleWishlist}
                  adding={addingId === product.product_id}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => {
                const imageUrl = getImageUrl(product.image_url);
                return (
                  <div key={product.product_id} className="bg-white rounded-lg border border-gray-100 transition-all duration-300 overflow-hidden group">
                    <div
                      className="aspect-square w-full bg-gray-100 cursor-pointer overflow-hidden"
                      onClick={() => handleViewDetails(product.product_id)}
                    >
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3
                        className="font-bold text-gray-800 mb-2 hover:text-pink-500 cursor-pointer"
                        onClick={() => handleViewDetails(product.product_id)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.old_price && (
                          <span className="text-pink-500 line-through text-sm">
                            ${product.old_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <StarRating rating={product.rating || 4} />

                      
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleAddToCart(product.product_id)}
                          disabled={addingId === product.product_id}
                          className="bg-gray-100 rounded-full p-2 hover:bg-purple-100 hover:text-purple-500 transition-colors disabled:opacity-50"
                          title="Add to Cart"
                        >
                          <FaShoppingCart className="text-sm" />
                        </button>
                        <button
                          onClick={handleWishlist}
                          className="bg-gray-100 rounded-full p-2 hover:bg-pink-100 hover:text-pink-500 transition-colors"
                          title="Add to Wishlist"
                        >
                          <FaRegHeart className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleViewDetails(product.product_id)}
                          className="bg-gray-100 rounded-full p-2 hover:bg-blue-100 hover:text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <FaSearchPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 mb-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border rounded transition-all ${
                    currentPage === page
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'border-gray-300 hover:bg-pink-500 hover:text-white hover:border-pink-500'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg overflow-hidden border border-gray-100">
            <img
              src="https://res.cloudinary.com/dua4go47y/image/upload/v1777010248/products/image_015.png"
              alt="Advertisement"
              className="w-full h-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1200x200/pink/white?text=Advertisement';
              }}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ShopList;