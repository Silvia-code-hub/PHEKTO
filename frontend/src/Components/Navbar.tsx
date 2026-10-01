import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    { id: 1, label: 'About Us', path: '/about-us' },
    { id: 2, label: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className='sticky top-0 z-50 bg-white shadow-sm'>
      <div className='container mx-auto px-4'>
        
        <div className='flex justify-between items-center'>
          
        
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5 text-gray-600" />
              ) : (
                <FaBars className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-custom-blue'>
              <Link to="/">Hekto</Link>
            </h1>
          </div>

          
          <div className='hidden lg:flex items-center gap-6'>
            
           
            <div 
              className='relative'
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <select
                value={location.pathname}
                onChange={(e) => navigate(e.target.value)}
                className='absolute appearance-none inset-0 w-full h-full opacity-0 cursor-pointer z-10'
              >
                
                {menuItems.map((item) => (
                  <option key={item.id} value={item.path} className="text-black appearance-none">
                    {item.label}
                  </option>
                ))}
              </select>
              <div className={`
                flex items-center gap-1 px-3 py-2 rounded-md
                ${isActive("/") ? "text-custom-pink" : "text-gray-700 hover:text-custom-pink"}
                cursor-pointer border border-transparent hover:border-gray-300
                transition-colors duration-200
              `}>
                <span className="font-normal text-base "> <Link to="/"> Home </Link> </span>
                <span className="text-xs">
                  {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
            </div>

           
            <Link
              to="/trending"
              className={`font-normal text-base px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/trending') ? 'text-custom-pink' : 'text-gray-700 hover:text-custom-pink'
              }`}
            >
              Trending
            </Link>

            
              
            <Link
              to="/products"
              className={`font-normal text-base px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/products') ? 'text-custom-pink' : 'text-gray-700 hover:text-custom-pink'
              }`}
            >
              Products
            </Link>

           
    
             <div className="relative group">
                 <button
                     className={`font-normal text-base px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-1 ${
                         isActive('/shop-list') || isActive('/grid') || isActive('/shopping-cart')
                             ? 'text-custom-pink'
                             : 'text-gray-700 hover:text-custom-pink'
                     }`}
                 >
                     Shop
                     <svg
                         className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                     >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                 </button>
             
                 <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                     <Link
                         to="/grid"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/grid')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Shop Grid Default
                     </Link>
                     <Link
                         to="/shop-list"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/shop-list')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Shop List
                     </Link>
                     <Link
                         to="/side-bar"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/side-bar')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Side Bar
                     </Link>
                     <Link
                         to="/shopping-cart"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/shopping-cart')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Shopping Cart
                     </Link>
                 </div>
             </div>
             
             
             <div className="relative group">
                 <button
                     className={`font-normal text-base px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-1 ${
                         isActive('/blog') || isActive('/single-blog') || isActive('/hekto-demo')
                             ? 'text-custom-pink'
                             : 'text-gray-700 hover:text-custom-pink'
                     }`}
                 >
                     Blog
                     <svg
                         className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                         fill="none"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                     >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                 </button>
             
                 
                 <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                     <Link
                         to="/blog"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/blog')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         All Posts
                     </Link>
                     <Link
                         to="/single-blog"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/single-blog')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Single Blog Post
                     </Link>
                     <Link
                         to="/hekto-demo"
                         className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                             isActive('/hekto-demo')
                                 ? 'text-custom-pink bg-pink-50'
                                 : 'text-gray-700 hover:text-custom-pink hover:bg-pink-50'
                         }`}
                     >
                         Hekto Demo
                     </Link>
                 </div>
             </div>
             
            
            <Link
              to="/contact-us"
              className={`font-normal text-base px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/contact-us') ? 'text-custom-pink' : 'text-gray-700 hover:text-custom-pink'
              }`}
            >
              Contact Us
            </Link>
          </div>

          
          <div className='flex items-center'>
            <form 
              className='hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2  focus-within:border-transparent transition-all duration-200 shadow-sm hover:shadow-md'
              onSubmit={handleSearch}
            >
              <input 
                      type="search" 
                      placeholder=" " 
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-l-md focus:outline-none  bg-white"
                    />
                    <button className=" px-6 py-4 bg-[#fb2e86] text-white rounded-r-md hover:bg-[#e01c6f] transition-all">
                      <FaSearch />
                    </button>
            </form>
          </div>
        </div>

       
        {isMobileMenuOpen && (
          <div className='lg:hidden border-t border-gray-200 pt-4 pb-6 mt-4'>
            
            <form className='mb-6' onSubmit={handleSearch}>
              <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-custom-pink focus-within:border-transparent'>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-3 outline-none w-full text-gray-700 placeholder-gray-400 bg-white"
                />
                <button
                  type="submit"
                  className="bg-custom-pink text-white px-4 py-3 hover:bg-pink-600 transition-colors flex-shrink-0"
                  aria-label="Search"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              </div>
            </form>

            
            <div className='space-y-2'>
              
              <div className='mb-3'>
                <select
                  value={location.pathname}
                  onChange={(e) => {
                    navigate(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                >
                  <option value="/">Home</option>
                  {menuItems.map((item) => (
                    <option key={item.id} value={item.path}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              
              <Link
                to="/trending"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/trending') 
                    ? 'bg-custom-pink text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Trending
              </Link>

              
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/products') 
                    ? 'bg-custom-pink text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Products
              </Link>

              
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/blog') 
                    ? 'bg-custom-pink text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Blog
              </Link>

              
              <Link
                to="/shop-list"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/shop-list') 
                    ? 'bg-custom-pink text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Shop
              </Link>

              
              <Link
                to="/contact-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive('/contact-us') 
                    ? 'bg-custom-pink text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;