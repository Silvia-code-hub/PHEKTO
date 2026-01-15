import{  Type, type shop  } from "./ShopListItems";
// import "./ShopList.css"
import Layout from "../Components/Layout";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';
interface ShopListItemProps {
  item: shop;
}

const ShopListItem: React.FC<ShopListItemProps> = ({item}) =>{
    const { image, name, colors, description, rating, price, oldPrice } = item;
    return(
        
            <div className="third-container flex-wrap flex flex-row w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden mb-6">
                
                <div className=" w-full flex flex-col md:flex-row h-full">
                  <div className="pic-container  w-full  sm:w-2/5 md:w-1/3 flex-shrink-0">
                  <div className="h-full w-full overflow-hidden">
                    <img src={image} 
                    alt={name} 
                    className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300"/>
                  </div>
                    
                </div>
                <div className="pic-info p-4 sm:p-3 ">
                    <div className="p-3 flex flex-col sm:flex-row sm:items-center  mb-2">
                        <h3 className="image-name text-blue-extra font-bold text-base sm:text-lg mb-2 sm:mb-0">{name}</h3>
                                <div className="color-dots opacity-100 flex ml-10 ">
                                  {colors.map((color, id) => (
                                    <span 
                                      key={id} 
                                      className="dot" 
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                        
                                </div>
                    </div>
                    <div className="p-02"></div>
                    <div className="p-2 mb-3 ">
                        <div className="pricing">
                          <span className="new-price text-blue-extra font-normal text-base mr-3">${price.toFixed(2)}</span>
                          <span className="old-price text-custom-pink line-through ">${oldPrice.toFixed(2)}</span>
                        </div>
                        <div className="product-rating mt-2 ">
        
                            {Array(5)
                           .fill(null)
                           .map((_, i) => (
                            <span key={i} className={i < rating ? 'star-filled text-[#FFC416]' : 'star-empty text-[#e2e8f0]'}>
                              ★
                            </span>
                          ))}
                        </div>

                        
                    </div>
                    <div className="p-3 mb-5 grid  ">
                        <div><p className="description -mt-2 text-light-gray text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">{description}</p></div>
                        <div className="icons flex mt-3">
                                  <FaShoppingCart className="mr-3 text-gray-icon bg-white"/>
                                  <FaRegHeart className="mr-3 text-gray-icon"/>
                                  <FaSearchPlus className=" text-gray-icon"/>
                        
                                </div>
                        </div>
                        
                </div>
                </div>
                  
            </div>
      

    )
}
const ShopList: React.FC = () =>{
    return(
        
         <div className="Big-container">
          <Layout>
            <div className="first-part bg-off-gray h-[286px] pl-5">
                <h2 className="first-heading text-dark-blue font-bold text-4xl pt-10  "> Shop List</h2>
                <div className="buttons mt-5 flex">
                  <div><button className="nav-link mr-3 text-black hover:text-custom-pink font-medium text-base ">Home</button></div>
                  <ul><li><div><button className="nave-link mr-3 text-black hover:text-custom-pink font-medium text-base"> . Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link text-black hover:text-custom-pink font-medium text-base"> . Shop List</button></div></li></ul> 

                </div>
            </div> 
            <div className="second-part mt-10 md:flex justify-between ">
              <div>
                <h3 className="second-heading font-bold text-blue-shade text-[22px]">Ecommerce Accessories & Fashion item </h3>
                <p className="small-text font-normal text-custom-gray text-xs mt-3 ">About 9,620 results (0.62 seconds)</p>

              </div>
                

                <div className="controls  flex gap-8 mt-2 flex-wrap mb-10  md:mb-2 ml-5">
                 <div className="flex items-center gap-2">
                    <label htmlFor="perPage" className="text-sm font-medium text-new-gray">Per page:</label>
                    <select id="perPage" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option value="10">10</option>
                      <option value="25" selected>25</option>
                      <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                   </div>
                    <div className="flex items-center gap-2">
                          <label htmlFor="sortBy" className="text-sm font-medium text-new-gray">Sort by:</label>
                           <select id="sortBy" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                           <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name_asc">Name A-Z</option>
                           <option value="name_desc">Name Z-A</option>
                           <option value="price_low">Price: Low to High</option>
                           <option value="price_high">Price: High to Low</option>
                            <option value="popular">Most Popular</option>
                             </select>
                            </div>

                            <div className="flex items-center gap-1 ">
                               <span className="text-sm font-medium text-new-gray">View:</span>
                               <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                <button className="p-2 bg-white hover:bg-gray-50 border-r border-gray-300 active:bg-gray-100" data-view="grid" title="Grid View">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                   </svg>
                                    </button>
                                     <button className="p-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300" data-view="list" title="List View">
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                                     </svg>
                                     </button>
                                       </div>
                                       <form action="">
                                        <input type="text" placeholder="" className="search-box border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"/>
                                       </form>
                                  </div>
                             

              </div>

            </div>
            <div className="mt-12 md:mt-16 lg:mt-20 sm:mt-20 ">
          <div className="items-container grid grid-cols-1 mt-24 sm:mt-20 md:mt-24  flex-wrap gap-4 w-full ">
           {Type.map((item) => (
            <ShopListItem key={item.id} item={item} />
           ))}
        </div>
        </div>
        <div className="adt-container  mt-12 sm:mt-16 px-4 sm:px-6">
         <div className="adt-image w-full overflow-hidden rounded-lg">
            <img src="src/assets/images/image_015.png" alt=""  className="text-xs"/>
          </div>
        </div>
        </Layout>
        </div>
        

    )
}
export default ShopList;