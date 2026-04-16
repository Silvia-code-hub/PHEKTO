import React, { useState} from 'react';
import{  Type, type shop  } from "./ShopListItems";
import Layout from "../Components/layout";
import { FaShoppingCart,FaRegHeart,FaSearchPlus,FaStar, FaStarHalfAlt, FaTh, FaThList } from 'react-icons/fa';
import { getImageUrl } from '../Services/productService';
import { Link } from 'react-router-dom';
interface ShopListItemProps {
  item: shop;
}

const ShopListItem: React.FC<ShopListItemProps> = ({item}) =>{
    const { image, name, colors, description, rating, price, oldPrice } = item;
    const [imageLoaded, setImageLoaded] = useState(false);
    const optimizedImageUrl =  getImageUrl (image,300,300);
    
    

    const renderStart = (rating: number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i< fullStars; i++) {
        stars.push(<FaStar key={i} className = "text-yellow-400 text-sm"/>);
      }
      if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
      }
      const emptyStars = 5 - stars.length;
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaStar key={fullStars + i + (hasHalfStar ? 1 : 0)} className="text-gray-300 text-sm" />);
      }
      return stars;
    }
    return(
        
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[270px] h-[200px] md:h-[220px] bg-gray-100 relative overflow-hidden">
                   {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img src={optimizedImageUrl}
                     alt={name}
                     className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                            setImageLoaded(true);
                        }}
                     />
                </div>
                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex ">
                        <h3 className="text-xl mr-10 font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                          {name}
                          </h3>
                                <div className="flex gap-2 mb-3">
                                  {colors.map((color, id) => (
                                    <span 
                                      key={id} 
                                      className="w-5 h-5 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform" 
                                      style={{ backgroundColor: color }}
                                       title={`Color ${id + 1}`}
                                    />
                                  ))}
                        
                                </div>
                    </div>

                    <div className=" grid justify-start gap-4  ">
                      <div className='price-rating flex text-left flex-wrap ml-5'>
                           <div className="flex items-center gap-4 md:justify-end mr-4">
                             <span className="text-2xl font-bold text-gray-800">${price.toFixed(2)}</span>
                             <span className="text-pink-700 text-semi-bold line-through">${oldPrice.toFixed(2)}</span>
                           </div>
                        
                             <div className="flex items-center gap-1 mb-3">
             
                                 {renderStart(rating)}
                                 <span className="text-gray-500 text-sm ml-2">
                                   ({rating}.0)
                                 </span>
                               
                             </div>
                      </div>
                        

                          <div className="p-3">
                          <p className="text-gray-500 text-sm leading-relaxed mb-4">{description}</p>
                          </div>
                      
                        </div>

                        <div className="flex justify-start gap-3">
                                  <button className="bg-gray-100 text-white p-2 rounded-full  transition-all duration -300 group">
                                    <FaShoppingCart className="text-gray-600 group-hover:text-white text-lg"/>
                                  </button>
                                  <button className="bg-gray-100 text-gray-700 p-2 rounded-full  transition-all duration-300 group">
                                    <FaRegHeart className="text-gray-600 group-hover:text-white text-lg"/>
                                  </button>
                                  <button className="bg-gray-100 text-gray-700 p-2 rounded-full  transition-all duration-300 group">
                                    <FaSearchPlus className="text-gray-600 group-hover:text-white text-lg"/>
                                  </button>
                           </div>
                    </div>
                </div>
            </div>
            </div>
      

    );
};
const ShopList: React.FC = () =>{
 const [sortBy, setSortBy] = useState('name');
    const [itemsPerPage] = useState(12);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);

    return(
        
         <div className="min-h-screen bg-gray-50">
          <Layout>
            <div className="bg-off-white py-20 mb-8">
              <div className="container mx-auto px-4">
            <div className="flex-row  md:flex-row justify-between items-center ">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-shade mb-3 md:mb-0"> Shop List</h2>
                <div className="flex items-center gap-2 text-gray-600 mt-5 mb-10">
                  <div><button className=" font-semi-bold text-black hover:text-pink-500 transition-colors"><Link to="/">Home . </Link></button></div>
                  <ul><li><div><button className="font-semi-bold text-black mr-2  hover:text-pink-500 transition-colors">Pages .</button></div></li></ul>
                  <ul><li><div><button className="font-semi-bold text-pink-500 transition-colors">Shop List</button></div></li></ul> 

                </div>
            </div>
            </div>
            </div>
            <div className="second-part flex justify-between md:flex-row">
              <div className='grid '>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ecommerce Accessories & Fashion item </h3>
                <p className="text-gray-500 text-sm mb-10">About 9,620 results (0.62 seconds)</p> 

              </div>
                
                <div className="flex gap-4 items-center flex-wrap">
                    <span className='text-blue-600'>Per page:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setCurrentPage(1)}
                        className="border rounded px-3 py-1 text-sm"
                    >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                    </select>   
                    <span className="text-sm text-blue-600">Sort By:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded px-3 py-1 text-sm"
                    >
                        <option value="name">Sort by name</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                    </select>
                    <span className="text-sm text-blue-600">View all</span>
                    
                    <div className="flex gap-2 border-l pl-4 ml-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'grid' 
                                    ? 'bg-gray-500 text-white' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            aria-label="Grid view"
                        >
                            <FaTh className="text-sm" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded transition-colors ${
                                viewMode === 'list' 
                                    ? 'bg-gray-500 text-white' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                            aria-label="List view"
                        >
                            <FaThList className="text-sm" />
                        </button>
                    </div>
                </div>

            </div>
          <div className="items-container">
           {Type.map((item) => (
            <ShopListItem key={item.id} item={item} />
           ))}
        </div>
        <div className="adt-container mx-auto px-4 mt-12 mb-8">
         <div className="adt-image bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg overflow-hidden">
            <img 
            src="src/assets/images/image_015.png" 
            alt="" 
            className="w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x200?text=Advertisement';
                }}/>
          </div>
        </div>
        </Layout>
        </div>
        

    )
}
export default ShopList;