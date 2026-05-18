import React, { useState } from "react";
import { FaShoppingCart, FaRegHeart, FaSearchPlus, FaTh, FaThList } from 'react-icons/fa';
import Layout from "../Components/layout";
import { Link } from "react-router-dom";


export interface SideBar {
  id: number;
  name: string;
  image: string;
  colors: string[];
  description: string;
  rating: number;
  price: number;
  oldPrice: number;
}

export interface PriceRange {
  id: number;
  label: string;
  min: number;
  max: number;
}

export interface ColorOption {
  id: number;
  name: string;
  value: string;
}

export interface FiltersState {
  brands: string[];
  discountOffers: string[];
  ratings: number[];
  categories: string[];
  priceRange: PriceRange | null;
  colors: string[];
}

export interface FilterOptions {
  filters: FiltersState;
  onFilterChange: (filterType: keyof FiltersState, value: any) => void;
}


const products: SideBar[] = [
  {
    id: 1,
    name: "Dictum morbi",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010193/products/image_037.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 4,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 2,
    name: "Sedoles sit",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010197/products/image_040.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 5,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 3,
    name: "Nibh varius",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010194/products/image_038.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 3,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 4,
    name: "Mauris quis",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010195/products/image_039.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 3,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 5,
    name: "Marbi sagittis",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010199/products/image_042.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 4,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 6,
    name: "Utricies venenatis",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010200/products/image_043.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 4,
    price: 26.00,
    oldPrice: 52.00
  },
  {
    id: 7,
    name: "Scelerisque dignissim",
    image: "https://res.cloudinary.com/dua4go47y/image/upload/v1777010198/products/image_041.jpg",
    colors: ["#DE9034", "#E60584", "#5E37FF"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnis in est adipiscing in pharetra non in justo.",
    rating: 5,
    price: 26.00,
    oldPrice: 52.00
  }
];


const filterData = {
  brands: [
    "Coaster Furniture",
    "Fusion Dot High Fashion",
    "Unique Furniture Restor",
    "Dream Furniture Flipping",
    "Young Repurposed",
    "Green DIY furniture"
  ],
  discountOffers: [
    "20% Cashback",
    "5% Cashback Offer",
    "25% Discount Offer"
  ],
  categories: [
    "Perfume",
    "Magento",
    "Bounceware",
    "eCommerce",
    "3Dart",
    "Bags",
    "Accessories",
    "Jewelry",
    "Wallets"
  ],
  priceRange: [
    { id: 1, label: "$0.00 - $150.00", min: 0, max: 150 },
    { id: 2, label: "$150.00 - $500.00", min: 150, max: 500 },
    { id: 3, label: "$500.00 - $1,000.00", min: 500, max: 1000 },
    { id: 4, label: "$1,000.00+", min: 1000, max: Infinity }
  ],
  colors: [
    { id: 1, name: "Blue", value: "#5E37FF" },
    { id: 2, name: "Orange", value: "#FF9437" },
    { id: 3, name: "Brown", value: "#FFBF95" },
    { id: 4, name: "Green", value: "#33D221" },
    { id: 5, name: "Purple", value: "#E248FF" },
    { id: 6, name: "Sky", value: "#26CBFF" }
  ]
};


const SideBarr: React.FC<FilterOptions> = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    discounts: true,
    ratings: true,
    categories: true,
    price: true,
    colors: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (section: keyof FiltersState, value: string) => {
    const currentValues = filters[section] as string[];
    if (currentValues.includes(value)) {
      onFilterChange(section, currentValues.filter(v => v !== value));
    } else {
      onFilterChange(section, [...currentValues, value]);
    }
  };

  const handleRatingChange = (rating: number) => {
    const currentRatings = filters.ratings;
    if (currentRatings.includes(rating)) {
      onFilterChange('ratings', currentRatings.filter(r => r !== rating));
    } else {
      onFilterChange('ratings', [...currentRatings, rating]);
    }
  };

  const handlePriceChange = (range: PriceRange) => {
    if (filters.priceRange?.id === range.id) {
      onFilterChange('priceRange', null);
    } else {
      onFilterChange('priceRange', range);
    }
  };

  const handleColorChange = (colorName: string) => {
    const currentColors = filters.colors;
    if (currentColors.includes(colorName)) {
      onFilterChange('colors', currentColors.filter(c => c !== colorName));
    } else {
      onFilterChange('colors', [...currentColors, colorName]);
    }
  };

  const ratingOptions = [
    { stars: 5, count: 254 },
    { stars: 4, count: 194 },
    { stars: 3, count: 102 }
  ];

  return (
    <div className="w-full">
      
      <div className="border-b border-gray-100">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("brands")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Product Brand</h3>
          <span className="text-lg text-gray-400">{expandedSections.brands ? "−" : "+"}</span>
        </div>
        {expandedSections.brands && (
          <div className="pb-3 space-y-2">
            {filterData.brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 py-1 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleCheckboxChange("brands", brand)}
                  className="hidden"
                />
                <span className={`w-4 h-4 border rounded transition-all flex-shrink-0 ${filters.brands.includes(brand) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {filters.brands.includes(brand) && (
                    <span className="flex items-center justify-center text-white text-xs">✓</span>
                  )}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      
      <div className="border-b border-gray-100">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("discounts")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Discount Offer</h3>
          <span className="text-lg text-gray-400">{expandedSections.discounts ? "−" : "+"}</span>
        </div>
        {expandedSections.discounts && (
          <div className="pb-3 space-y-2">
            {filterData.discountOffers.map(offer => (
              <label key={offer} className="flex items-center gap-2 py-1 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.discountOffers.includes(offer)}
                  onChange={() => handleCheckboxChange("discountOffers", offer)}
                  className="hidden"
                />
                <span className={`w-4 h-4 border rounded transition-all flex-shrink-0 ${filters.discountOffers.includes(offer) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {filters.discountOffers.includes(offer) && (
                    <span className="flex items-center justify-center text-white text-xs">✓</span>
                  )}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{offer}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      
      <div className="border-b border-gray-100">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("ratings")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Rating Item</h3>
          <span className="text-lg text-gray-400">{expandedSections.ratings ? "−" : "+"}</span>
        </div>
        {expandedSections.ratings && (
          <div className="pb-3 space-y-2">
            {ratingOptions.map(option => (
              <div 
                key={option.stars} 
                className={`flex items-center gap-2 py-1 cursor-pointer transition-opacity hover:opacity-80 ${filters.ratings.includes(option.stars) ? 'opacity-100' : 'opacity-70'}`}
                onClick={() => handleRatingChange(option.stars)}
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-sm ${i < option.stars ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">({option.count})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="border-b border-gray-100">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("categories")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Categories</h3>
          <span className="text-lg text-gray-400">{expandedSections.categories ? "−" : "+"}</span>
        </div>
        {expandedSections.categories && (
          <div className="pb-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {filterData.categories.map(category => (
                <label key={category} className="flex items-center gap-2 py-1 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCheckboxChange("categories", category)}
                    className="hidden"
                  />
                  <span className={`w-4 h-4 border rounded transition-all flex-shrink-0 ${filters.categories.includes(category) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                    {filters.categories.includes(category) && (
                      <span className="flex items-center justify-center text-white text-xs">✓</span>
                    )}
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      
      <div className="border-b border-gray-100">
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Price Filter</h3>
          <span className="text-lg text-gray-400">{expandedSections.price ? "−" : "+"}</span>
        </div>
        {expandedSections.price && (
          <div className="pb-3 space-y-2">
            {filterData.priceRange.map(range => (
              <label key={range.id} className="flex items-center gap-2 py-1 cursor-pointer group">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.id === range.id}
                  onChange={() => handlePriceChange(range)}
                  className="hidden"
                />
                <span className={`w-4 h-4 border rounded-full transition-all flex-shrink-0 ${filters.priceRange?.id === range.id ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                  {filters.priceRange?.id === range.id && (
                    <span className="flex items-center justify-center w-full h-full">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    </span>
                  )}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      
      <div>
        <div 
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={() => toggleSection("colors")}
        >
          <h3 className="text-sm font-semibold text-[#151875] uppercase tracking-wide">Filter By Color</h3>
          <span className="text-lg text-gray-400">{expandedSections.colors ? "−" : "+"}</span>
        </div>
        {expandedSections.colors && (
          <div className="pb-3">
            <div className="flex flex-wrap gap-3">
              {filterData.colors.map(color => (
                <label 
                  key={color.id} 
                  className={`flex items-center gap-1.5 cursor-pointer transition-all ${filters.colors.includes(color.name) ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                >
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color.name)}
                    onChange={() => handleColorChange(color.name)}
                    className="hidden"
                  />
                  <span 
                    className={`w-4 h-4 rounded-full border transition-all ${filters.colors.includes(color.name) ? 'border-gray-800 ring-1 ring-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.value }}
                  ></span>
                  <span className={`text-xs ${filters.colors.includes(color.name) ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{color.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const SidebarItem: React.FC<{ item: SideBar }> = ({ item }) => {
  const { image, name, colors, description, rating, price, oldPrice } = item;
  
  return (
    <div className="border-b border-gray-100 py-4 last:border-b-0">
      <div className="flex gap-4">
        
        <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden bg-gray-50 group rounded">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <FaShoppingCart className="text-white text-sm cursor-pointer hover:text-blue-400 transition-colors p-1.5 bg-white/20 rounded-full w-7 h-7 hover:bg-blue-600 hover:scale-110" />
            <FaRegHeart className="text-white text-sm cursor-pointer hover:text-blue-400 transition-colors p-1.5 bg-white/20 rounded-full w-7 h-7 hover:bg-blue-600 hover:scale-110" />
            <FaSearchPlus className="text-white text-sm cursor-pointer hover:text-blue-400 transition-colors p-1.5 bg-white/20 rounded-full w-7 h-7 hover:bg-blue-600 hover:scale-110" />
          </div>
        </div>

        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-[#151875]">{name}</h3>
            <div className="flex gap-2">
              {colors.map((color, idx) => (
                <span 
                  key={idx} 
                  className="w-3 h-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-1">
            <span className="text-base font-bold text-[#151875]">${price.toFixed(2)}</span>
            <span className="text-xs text-pink-500 line-through">${oldPrice.toFixed(2)}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 leading-relaxed mt-2">{description}</p>
          
          <div className="flex gap-3 mt-2">
            <FaShoppingCart className="text-gray-400 text-sm cursor-pointer hover:text-blue-600 transition-colors" />
            <FaRegHeart className="text-gray-400 text-sm cursor-pointer hover:text-blue-600 transition-colors" />
            <FaSearchPlus className="text-gray-400 text-sm cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};


const Sidee: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    brands: [],
    discountOffers: [],
    ratings: [],
    categories: [],
    priceRange: null,
    colors: []
  });

  const handleFilterChange = (filterType: keyof FiltersState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredProducts = products.filter(product => {
    if (filters.priceRange) {
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
    }
    return true;
  });

  const [sortBy, setSortBy] = useState('name');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <Layout>
        
        <div className="bg-[#f6f5ff]">
          <div className="max-w-[1200px] mx-auto px-4 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#151875] mb-2">
              Shop Left Sidebar
            </h1>
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link to="/" className="text-[#151875] hover:text-blue-600 transition">Home</Link>
              <span className="text-gray-400">·</span>
              <span className="text-[#151875]">Pages</span>
              <span className="text-gray-400">·</span>
              <span className="text-pink-500 font-medium">Shop Left Sidebar</span>
            </div>
          </div>
        </div>

        
        <div className="max-w-[1200px] mx-auto px-4 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#151875]">
                Ecommerce Accessories & Fashion item
              </h2>
              <p className="text-xs text-gray-500">About 9,620 results (0.62 seconds)</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[#151875] text-sm">Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[#151875] text-sm">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Best_match">Sort by best match</option>
                  <option value="name">Sort by name</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
              
              <div className="flex gap-2 border-l border-gray-300 pl-3">
                <span className="text-[#151875] text-sm font-medium">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <FaTh className="text-xs" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <FaThList className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            
            <div className="lg:w-64 flex-shrink-0 border-r border-gray-200 py-4">
              <SideBarr filters={filters} onFilterChange={handleFilterChange} />
            </div>

            
            <div className="flex-1 min-w-0 py-4">
              <div className="space-y-0 divide-y divide-gray-100">
                {filteredProducts.map((item) => (
                  <SidebarItem key={item.id} item={item} />
                ))}
              </div>
              
              
              
            </div>
          </div>
        </div>
        <div className="mt-6">
                <img 
                  src="https://res.cloudinary.com/dua4go47y/image/upload/v1777010168/products/image_015.png" 
                  alt="Advertisement"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
      </Layout>
    </div>
  );
};

export default Sidee;