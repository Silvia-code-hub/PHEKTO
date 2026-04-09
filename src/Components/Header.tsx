// import './Header.css';
import {FaRegUser, FaRegHeart, FaShoppingCart, FaEnvelope, FaPhoneAlt} from 'react-icons/fa'

function Header (){
    
    return(
        

        <div className='bg-purple-main text-white flex h-auto items-center justify-evenly px-4 sm:px-6 lg:px-8 py-2 sm:py-0'>
            
            
            <div className="hidden sm:flex items-center gap-4 lg:6   ">
             <div className='flex items-center font-semibold text-xs lg:text-sm gap-2'><FaEnvelope className='text-white mt-1 text-sm' /> <span>mhhasanul@gmail.com</span></div> 
             <div className='  flex items-center font-semibold text-xs lg:text-sm gap-2'><FaPhoneAlt className='text-white text-sm ' /><span>(12345)67890</span></div> 
            </div>
            <div className=' sm:hidden items-center gap-4 flex mr-4 '>
              <FaEnvelope className='text-white   text-sm' />
              <FaPhoneAlt className='text-white text-sm' />
            </div>
            <div className='flex items-center gap-0 sm:gap-2 '>
            <div className='flex flex-col sm:flex-row sm:gap-1 lg:gap-3 items-center gap-0'>
              <form className='w-full sm:auto'>
          <select 
            name="language" 
            id="language"
            className='bg-transparent text-white font-bold  text -xs sm:text-sm border-none outline-none w-full sm:auto lg:mr-0'>
            <option value="English" className='text-black'>English</option>
            <option value="Spanish" className=' text-black'>Spanish</option>
            <option value="French" className='text-black'>French</option>
            <option value="Dutch" className='text-black'>Dutch</option>
            <option value="Chinese" className='text-black'>Chinese</option>
          </select>
        </form>
            
        <form >
          <select 
            name="currency" 
            id="currency"
            className='bg-transparent text-white font-bold text-xs sm:text-sm border-none outline-none'>
            <option value="USD" className='text-black' >USD</option>
            <option value="EUR" className='text-black'>EUR </option>
            <option value="GBP" className='text-black'>GBP</option>
            <option value="KES" className='text-black'>KES</option>
            <option value="CNY" className='text-black' >CNY</option>
          </select>
        </form>

             </div>
        
         <div className='flex items-center gap-2 sm:gap-3  '> 
          <a href="#" className='flex items-center gap-1 font-semibold text-xs sm:text-sm  '><span className='hidden sm:inline'>login</span> <FaRegUser className='text-sm sm:text-base' /> </a>
        
        <a href="#" className='flex items-center gap-1 font-semibold text-xs sm:text-sm' ><span className='hidden sm:inline'>Wishlist</span> <FaRegHeart className='text-sm sm:text-base' /> </a>
        <a href="#" className='flex items-center gap-1 font-semibold text-xs sm:text-sm '><FaShoppingCart className='text-sm sm:text-base' /> <span className='hidden ml-1 text-xs'>Cart</span> </a>
        
         </div>
            </div>

             
        

       
            
        </div>
    )
}



export default Header;