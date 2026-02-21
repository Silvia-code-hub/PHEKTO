import Layout from "../Components/Layout";
import type{ Product } from "./Defaultitems";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';


interface EcomProps{
  
  products: Product[];
}
const Default:React.FC<EcomProps> =({ products  }) =>{
    console.log('product data:',products);
    return(
        
        <div className="shop-grid-whole">
          <Layout>
             <div className="bg-off-gray h-[286px] ">
             <h2 className="font-bold text-4xl text-dark-blue text-left px-10 "> Shop Grid Default</h2>
            <div className="text-black font-medium text-base  flex  mt-5 px-10">
               <div><button className="mr-5 hover:text-custom-pink">Home</button></div>
               <ul><li><div><button className="mx-5 hover:text-custom-pink">. Pages</button></div></li></ul>
               <ul><li><div><button className="hover:text-custom-pink">. Shop Grid Default</button></div></li></ul> 

            </div>
        
            </div>
           <div className="bg-white mt-10">
            <div className=" grid gap-3 mb-4  sm:flex md:flex justify-between">
              <div className="h-[44px] grid gap-2">
                <h3 className="text-blue-shade font-bold text-[22px]">Ecommerce Accessories & Fashion item </h3>
                <p className="text-custom-gray font-normal text-xs">About 9,620 results (0.62 seconds)</p>
              </div>

              <div className="controls  flex gap-8 mt-8 flex-wrap">
                 <div className="flex items-center gap-2">
                    <label htmlFor="perPage" className="text-sm font-medium text-gray-700">Per page:</label>
                    <select id="perPage" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option value="10">10</option>
                      <option value="25" selected>25</option>
                      <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                   </div>
                    <div className="flex items-center gap-2">
                          <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">Sort by:</label>
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

                            <div className="flex items-center gap-2">
                               <span className="text-sm font-medium text-gray-700">View:</span>
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
             <div className=" flex justify-between flex-wrap mx-5 px-10 gap-5">
              {products.map((product) =>(
                <div key={product.id} className="product-card w-[270px] h-[365px]">
                  <div className="image-container text-cream-white hover:bg-green-shade-light w-[270px] h-[280px] ">
                    <div className="w-[169px] h-[169px] l-[86px] pl-10 pt-7">
                   <img src={product.image} alt={product.name} />
                   </div>
                   <div className="icons  w-[30px] h-[82px] pl-10  pt-3" >
                     
                     <FaRegHeart/>
                     <FaSearchPlus/>
                     <FaShoppingCart/>
           
                   </div>
                 </div>
                 <div className="image-info h-[83px] w-[270px] bg-white flex flex-col ">
                   <h3 className="image-name text-blue-shade font-bold text-lg flex pl-3">{product.name}</h3>
                   <div className="default-color-dots">
                     {product.colors && product.colors.map((color:string, index: number) => (
                       <span 
                         key={index} 
                         className="dot" 
                         style={{ backgroundColor: color }}
                       />
                     ))}
           
                   </div>
                   <div className="pricing pl-10 ">
                      <span className="new-price text-blue-shade ">${product.price.toFixed(2)}</span>
                      {product.oldPrice &&(
                     <span className="old-price  text-custom-pink line-through ml-5">${product.oldPrice.toFixed(2)}</span>
                      )}
                   </div>
                 </div>
               </div>
              ))}
             </div>
                <div className="adt-image w-full overflow-hidden rounded-lg">
               <img src="src/assets/images/image_015.png" alt="" />
          </div> 
           

              </div>
             
             
            
        
        
    
        </Layout>
        </div>
    )
};        
export default Default;