
import { FaFacebook,FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
const Footer =() =>{
    return(
        <div className=" bg-light-blue-shade text-custom-gray w-full ">
            <div className="container  mx-auto px-4 sm:px-6 lg:px-1 pt-8 lg:pt-12 pb-0 w-full ">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12  ">
                <div className="space-y-4 sm:space-y-6">
                 <h2 className="  font-bold text-black text-2xl sm:text-3x1 lg:text-4xl leading-tight mb-4 "> Hekto</h2>
                 <form className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full  max-w-xs">
                   <input
                    type="email"
                    name="email" 
                    id="Enter Email Address"
                    className="text-custom-gray flex-1 px-3 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-pink"/>
                   <button className="bg-custom-pink text-light-blue-shade font-medium text-base items-center px-4 sm:px-6 py-2 rounded hover:bg-pink-600 transition-colors whitespace-nowrap ">Sign Up</button>
                 </form>
                 <div className="space-y-2 text-sm mt-4"></div>
                 <p className="font-semibold text-black ">Contact Info</p>
                 <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
               </div>
            
               <div className="space-y-3 ">
                <h2 className="font-semibold text-lg text-black  ">Categories</h2>
                <div className="space-y-1 text-sm">
                <p className=" hover:text-custom-pink cursor-pointer transition-colors mb-2">Laptops & Computers</p>
                <p className="hover:text-custom-pink cursor-pointer transition-colors mb-2">Cameras & Photography</p>
                <p className=" hover:text-custom-pink cursor-pointer transition-colors mb-2">Smart Phones & Tablets</p>
                <p className="hover:text-custom-pink cursor-pointer transition-colors mb-2">Video Games & Consoles</p>
                <p className="hover:text-custom-pink cursor-pointer transition-colors mb-2 flex-wrap">Waterproof Headphones</p>
                </div>
               </div>
               <div className="space-y-3">
                <h2 className=" mb-2 font-semibold text-lg text-black ">Customer Care</h2>
                <div className=" space-y-1 text-sm">
                <p  className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">My Account</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Discount</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Returns</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Orders History</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Order Tracking</p>
                </div>
               </div>
               <div className="space-y-3">
                <h2 className="mb-2 font-semibold text-lg text-black">Pages</h2>
                <div className="space-y-1">
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors" >Blog</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Browse the Shop</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Category</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Pre-Built Pages</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">Visual Composer Elements</p>
                <p className="mb-2 hover:text-custom-pink cursor-pointer transition-colors">WooCommerce Pages</p>
               </div>
               </div>
              </div>

             <div className="bg-gray-deep-shade py-3 ">
               <div className="container sm:px-6 lg:8 mx-auto ">
               <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 ">
                <p>©Webecy - All Rights Reserved</p>
                <div className="flex text-black gap-3">
                    <FaFacebook/>
                    <FaInstagramSquare/>
                    <FaTwitterSquare/>

                </div>


                </div>
        
               </div>
             </div>
        </div>
      </div>

    )
}
export default Footer;