
import { FaRegUser, FaRegHeart, FaShoppingCart, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
      <div className='bg-purple-main text-white w-full'>
        <div className='flex flex-wrap items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-0'>
           
            <div className="hidden sm:flex items-center gap-4 lg:gap-6">
                <div className='flex items-center font-bold text-xs lg:text-sm gap-2'>
                    <FaEnvelope className='text-white mt-1 text-sm' />
                    <span> {user ? user.email : 'mhhasanul@gmail.com'}</span>
                </div>
                <div className='flex items-center font-bold text-xs lg:text-sm gap-2'>
                    <FaPhoneAlt className='text-white text-sm' />
                    <span> {user ? user.phone : '(12345)67890'}</span>
                </div>
            </div>
            
           
            <div className='sm:hidden flex items-center gap-4'>
                <FaEnvelope className='text-white text-sm' />
                <FaPhoneAlt className='text-white text-sm' />
            </div>
            
           
            <div className='flex items-center gap-5 sm:gap-6 mr-2'>
              
                <div className='flex items-center gap-2 sm:gap-3'>
                    <form>
                        <select 
                            name="language" 
                            id="language"
                            className='bg-transparent text-white font-bold text-xs sm:text-sm border-none outline-none cursor-pointer'
                        >
                            <option value="English" className='text-black'>English</option>
                            <option value="Spanish" className='text-black'>Spanish</option>
                            <option value="French" className='text-black'>French</option>
                            <option value="Dutch" className='text-black'>Dutch</option>
                            <option value="Chinese" className='text-black'>Chinese</option>
                        </select>
                    </form>
                    
                    <form>
                        <select 
                            name="currency" 
                            id="currency"
                            className='bg-transparent text-white font-bold text-xs sm:text-sm border-none outline-none cursor-pointer'
                        >
                            <option value="USD" className='text-black'>USD</option>
                            <option value="EUR" className='text-black'>EUR</option>
                            <option value="GBP" className='text-black'>GBP</option>
                            <option value="KES" className='text-black'>KES</option>
                            <option value="CNY" className='text-black'>CNY</option>
                        </select>
                    </form>
                </div>
                
                
                <div className='flex items-center gap-3 sm:gap-4'>
                   
                    {user ? (
                        <>
                            <span className='hidden md:inline text-green-400 text-xs font-semibold'>
                                Hi, {user.username}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className='flex items-center gap-1 font-semibold text-xs sm:text-sm hover:text-pink-200 transition-colors'
                            >
                                <span className='hidden sm:inline'>Logout</span>
                                <FaRegUser className='text-sm sm:text-base' />
                            </button>
                        </>
                    ) : (
                        <Link 
                            to="/login" 
                            className='flex items-center gap-1 font-semibold text-xs sm:text-sm hover:text-pink-200 transition-colors'
                        >
                            <span className='hidden sm:inline'>Login</span>
                            <FaRegUser className='text-sm sm:text-base' />
                        </Link>
                    )}
                    
                    
                    <Link 
                        to="/wishlist" 
                        className='flex items-center gap-1 font-semibold text-xs sm:text-sm hover:text-pink-200 transition-colors'
                    >
                        <span className='hidden sm:inline'>Wishlist</span>
                        <FaRegHeart className='text-sm sm:text-base' />
                    </Link>
                    
                    
                    <Link 
                        to="/shopping-cart" 
                        className='flex items-center gap-1 font-semibold text-xs sm:text-sm hover:text-pink-200 transition-colors'
                    >
                        <FaShoppingCart className='text-sm sm:text-base' />
                        <span className='hidden ml-1 text-xs'>Cart</span>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
}

export default Header;