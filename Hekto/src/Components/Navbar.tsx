import { useState,  type FormEvent } from 'react';
import{Link,  useLocation, useNavigate} from 'react-router-dom';

import { FaSearch, FaChevronUp, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';





const Navigation = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();



  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };

 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const menuItems = [
        { id: 1, label: 'grid-default', path: '/grid'  },
        { id: 2, label: 'shop-list', path: '/shop-list' },  
        { id: 3, label: 'shop-left-sidebar', path: '/side-bar' },
        { id: 4, label: 'product-details', path: '/product-details' },
        { id: 5, label: 'shopping-cart', path: '/shopping-cart' },
        { id: 6, label: 'order-completed', path: '/order-complete' },
        { id: 7, label: 'hekto-demo', path: '/hekto-demo' },
        { id: 8, label: 'my-account', path: '/my-acc' },
        { id: 9, label: 'blog-page', path: '/blog' },
        { id: 10, label: 'single-blog', path: '/single-blog' },
        { id: 11, label: 'about-us', path: '/about-us' },
        { id: 12, label: 'contact-us', path: '/contact-us' },
        { id: 13, label: '404-not-found', path: '/not-found' },
        { id: 14, label: 'faq', path: '/faq' },

  ];
  

  const isActive = (path: string) => location.pathname === path;

  
  

    return (
      <nav className='sticky top-0 z-50 bg-white '>
      <div className='container mx-auto px-4 '>
        {/* main navigation bar */}
        <div className=' flex justify between gap-0 items-center '>
          {/* hamburger and logo */}

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6 text-gray-600 text-xs" />
              ) : (
                <FaBars className="w-6 h-6 text-gray-600 text-xs" />
              )}
            </button>
          <h1 className='font-bold text-4xl h-8 text-custom-blue flex-shrink-0 pl-60'>
             <Link to="/">Hekto</Link>
          </h1>
          </div>
      {/* desktop nav links */}
        <div className=' hidden lg:flex items-center gap-2 mx-4 flex-grow justify-center pr-40'>

          <div className=' relative '
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          
          >
            <select
             value={location.pathname}
              onChange={(e) => navigate(e.target.value)}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10'
              
               
              >
                 <option value="/" className="text-black">Home</option>
                 {menuItems.map((item) => (
                  <option 
                     key={item.id} 
                     value={item.path}
                     className="text-black"
                    >
                      {item.label}
                     </option>
                      ))}
              </select>
              <div 
              className={`
                flex items-center gap-1 px-3 py-2 rounded
               ${isActive("/") ? "text-custom-pink bg-white" : "text-gray-700 hover:text-custom-pink"}
                cursor-pointer border border-transparent hover:border-gray-300
               `}>
               <span className="font-normal text-base">Home</span>
               <span className="text-xs">
               {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
               </span>
               </div>
          </div>
     
         {/* other nav links */}
          
         {['trending', 'products', 'blog', 'shop-list', 'contact-us'].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                className={`
                  font-normal text-base px-3 py-2 rounded
                  hover:text-custom-pink transition-colors duration-200
                  ${isActive(`/${item}`) ? 'text-custom-pink' : 'text-gray-700'}
                `}
              >
                {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
              </Link>
            ))}

        
        </div>
        {/* search bar */}
        <div className='flex items-center space-x-4 mt-3 mr-20 '>
        
         <form 
            className=' hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-custom-pink focus-within:border-transparent transition-all duration-200 shadow-sm hover:shadow-md min-w-[180px] lg:min-w-[220px] '
        
            onSubmit={handleSearch}>
            <input
            type="text"
            placeholder=''
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='px-4 py-2.5 outline-none w-full  text-gray-700 placeholder-gray-500 bg-white ' />
            <button
            type='submit'
           className=" bg-custom-pink text-white p-3 hover:bg-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-gray focus:ring-offset-2  "
            aria-label="Search">
            <FaSearch className='w-5 h-5' />
            </button>

           </form>

       
        </div>
        
        </div>
        {/* mobile dropdown menu*/}
        {isMobileMenuOpen && (
          <div className='lg:hidden border-t border-gray-200 pt-4 pb-6'>
            {/* mobile search Bar */}
            <form className='mb-6'
            onSubmit={handleSearch}
            >
              <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-custom-gray focus-within:border-transparent'>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-3 outline-none w-full text-gray-700 placeholder-gray-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-custom-pink text-white p-3 hover:bg-pink-600 transition-colors flex-shrink-0"
                  aria-label="Search"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </div>

            </form>
            {/* mobile navigation links */}
            <div className='space-y-1'>
              <div className='mb-3'>
                <select
                  value={location.pathname}
                  onChange={(e) => {
                    navigate(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-pinkfocus:border-transparent"
                >
                  <option value="/">Home</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.path}>
                      {item.label.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              {['trending', 'products', 'blog', 'shop-list', 'contact-us'].map((item) => (
                <Link
                  key={item}
                  to={`/${item}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg transition-colors duration-200
                    ${isActive(`/${item}`) 
                      ? 'bg-custom-pink text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
                </Link>
              ))}

            </div>
          </div>
        )}
        
        
        </div>
      </nav>

       
         

      
      
  );
};

export default Navigation;
