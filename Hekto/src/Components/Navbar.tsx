import { useState,  type FormEvent } from 'react';
import{Link,  useLocation, useNavigate} from 'react-router-dom';
 //import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import './Navbar.css'
import { FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// import ShopList from "../Grid default/ShopList";
// import Sidee from "../Grid default/Sidebar";
// import ProductDetails from "../Grid default/ProductDetails";
// import ShoppingCart from "../Grid default/ShoppingCart";
// import OrderComplete from "../Grid default/OrderComplete";
// import HektoDemo from "../Grid default/HektoDemo";
// import MyAcc from "../Grid default/MyAcc";
// import Blogg from "../Grid default/Blog";
// import SingleBlog from "../Grid default/SingleBlog";
// import AboutUs from "../Grid default/AboutUs";
// import ContactUs from "../Grid default/ContactUs";
// import NotFound from "../Grid default/NotFound";
// import Faq from "../Grid default/Faq";



const Navigation = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();



  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  console.log('Navigation component is rendering');
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

  const handleDropdownClick = (path: string) => {
    navigate(path); 
    closeDropdown();


  

    return (
      <nav className='navbar'>
        <h1>Hekto</h1>
      
        <div className='nav-container'>
          <div className='dropdown-container'>
            <Link
            to="/"
             className={`nav-link dropdown-trigger ${isActive("/") ? "active" : ""}`}
            
            onMouseEnter={() => setIsDropdownOpen(true)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}>
              Home
              <span className='dropdown-icon'>
                 {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </Link>
            {isDropdownOpen &&(
              <div className='dropdown-menu'
              onMouseLeave={closeDropdown}>

                <ul className='dropdown-list'>
                                
                  {menuItems.map((item) => (
                    <li key={item.id} className='dropdown-item'>
                      <Link 
                        to={item.path}
                        className={`dropdown-link ${isActive(item.path) ? "active" : ""}`}
                        onClick={() => handleDropdownClick(item.path)}
                      >
                        {item.label}
                         
                      </Link>
                    </li>
                  ))} 
                </ul> 
               
              </div>
            )}
          </div>
     
        
          
        <div>
          <Link to="/trending" className={`nav-link ${isActive('/trending') ? 'active' : ''}`} >Trending</Link>
               {/* <TrendingPage/> */}
        </div>
        <div>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} >Products</Link>
        </div>
        <div>
          <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} >Blog</Link>
        </div>
        <div>
          <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`} >Shop</Link>
        </div>
        <div>
          <Link to="/contact-us" className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`} >Contact Us</Link>
        </div>

        
        </div>
        <form className='search-box' onSubmit={handleSearch}>
          <input
            type="text"
            placeholder=''
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="navbar-submit" aria-label="Search">
            <FaSearch />
          </button>

        </form>
        </nav>

       
         

      
      
  );
}};

export default Navigation;
