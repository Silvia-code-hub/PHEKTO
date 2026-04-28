import React, { useState, useEffect } from 'react';
import Layout from "../Components/layout";
import { FaShoppingCart, FaRegHeart, FaSearchPlus, FaStar, FaStarHalfAlt, FaTh, FaThList } from 'react-icons/fa';
import { Link } from 'react-router-dom';


interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  rating: number;
  colors: string[];
  imageUrl: string;
}


const products: Product[] = [
  {
    id: 1,
    name: 'Accumsan tincidunt',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.0,
    colors: ['#DE9034', '#E60584', '#5E37FF'], 
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010187/products/image_030.jpg'
  },
  {
    id: 2,
    name: 'In nulla',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.0,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010191/products/image_034.jpg'
  },
  {
    id: 3,
    name: 'Vel sem',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.0,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010189/products/image_032.jpg'
  },
  {
    id: 4,
    name: 'Porttitor cum',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.0,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010193/products/image_036.jpg'
  },
  {
    id: 5,
    name: 'Nunc in',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.0,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010188/products/image_031.jpg'
  },
  {
    id: 6,
    name: 'Vitae facilisis',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.5,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010192/products/image_035.jpg' 
  },
  {
    id: 7,
    name: 'Curabitur lectus',
    price: 26.00,
    oldPrice: 52.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    rating: 4.5,
    colors: ['#DE9034', '#E60584', '#5E37FF'],
    imageUrl: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010190/products/image_033.jpg' 
  },
];


const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
};

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


const ProductListItem: React.FC<{ product: Product }> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const optimizedImageUrl = getOptimizedImageUrl(product.imageUrl, 300, 300);

  return (
    <div 
      className="bg-white rounded-lg border border-gray-100 transition-all duration-300 overflow-hidden mb-3" // Removed shadow, reduced margin bottom to mb-3
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        
        
        <div className="relative w-full sm:w-[270px] bg-gray-100 flex-shrink-0">
          <div className="aspect-square sm:aspect-auto sm:h-[220px] w-full overflow-hidden bg-gray-100">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={optimizedImageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

       
        <div className="flex-1 p-4 sm:p-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 hover:text-pink-500 transition-colors cursor-pointer">
              {product.name}
            </h3>
            
            <div className="flex gap-1.5">
              {product.colors.slice(0, 3).map((color, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: color }}
                  title={`Color option ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-pink-500 line-through text-sm sm:text-base">
                ${product.oldPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} />
              <span className="text-gray-500 text-sm ml-1">({product.rating}.0)</span>
            </div>
          </div>

          
          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 sm:line-clamp-none">
            {product.description}
          </p>

          
          <div className="flex gap-3">
            <button 
              className={`p-2 rounded-full transition-all duration-300 ${hovered ? ' text-blue-500' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Add to cart"
            >
              <FaShoppingCart className="text-sm" />
            </button>
            <button 
              className={`p-2 rounded-full transition-all duration-300 ${hovered ? ' text-blue-500' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Add to wishlist"
            >
              <FaRegHeart className="text-sm" />
            </button>
            <button 
              className={`p-2 rounded-full transition-all duration-300 ${hovered ? ' text-blue-500' : 'bg-gray-100 text-gray-600'}`}
              aria-label="Quick view"
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
  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  
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
  }, [sortBy]);

 
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                About {products.length * 20} results (0.62 seconds)
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
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-pink-500 "
                >
                  <option 
                  value="Best_match"
                  className='text-gray-500'
                  >Sort by best match</option>
                  <option 
                  value="name"
                  className='text-gray-500'
                  >Sort by name</option>
                  <option 
                  value="price_low"
                  className='text-gray-500'
                  >Price: Low to High</option>
                  <option 
                  value="price_high"
                  className='text-gray-500'
                  >Price: High to Low</option>
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
                <div className="relative">
                   <input
                     type="text"
                     placeholder=" "
                     className="w-full sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 text-sm"
                   />
              </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'list' ? (
            <div>
              {paginatedProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-100 transition-all duration-300 overflow-hidden">
                  <div className="aspect-square w-full bg-gray-100">
                    <img
                      src={getOptimizedImageUrl(product.imageUrl, 400, 400)}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-bold text-gray-800">${product.price}</span>
                      <span className="text-pink-500 line-through text-sm">${product.oldPrice}</span>
                    </div>
                    <StarRating rating={product.rating} />
                  </div>
                </div>
              ))}
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
              className="w-full h-auto object-contain\"
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