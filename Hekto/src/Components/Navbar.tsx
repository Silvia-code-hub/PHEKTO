import { useState,  type FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import './Navbar.css'
import { FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import ShopList from "../Grid default/ShopList";
import Sidee from "../Grid default/Sidebar";
import ProductDetails from "../Grid default/ProductDetails";
import ShoppingCart from "../Grid default/ShoppingCart";
import OrderComplete from "../Grid default/OrderComplete";
import HektoDemo from "../Grid default/HektoDemo";
import MyAcc from "../Grid default/MyAcc";
import Blogg from "../Grid default/Blog";
import SingleBlog from "../Grid default/SingleBlog";
import AboutUs from "../Grid default/AboutUs";
import ContactUs from "../Grid default/ContactUs";
import NotFound from "../Grid default/NotFound";
import Faq from "../Grid default/Faq";



const Navigation = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');



  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchQuery);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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


  

    return (
      <nav className='navbar'>
        <h1>Hekto</h1>
      
        <div className='nav-container'>
          <div className='dropdown-container'>
            <button className='nav-link dropdown-trigger'
            onClick={toggleDropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}>
              Home
              <span className='dropdown-icon'>
                 {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {isDropdownOpen &&(
              <div className='dropdown-menu'
              onMouseLeave={closeDropdown}>

                <ul className='dropdown-list'>
                                
                  {menuItems.map((item) => (
                    <li key={item.id} className='dropdown-item'>
                      <a
                        href={item.path}
                        className='dropdown-link'
                        onClick={(e) => {
                          e.preventDefault();
                        //  navigate(item.path);
                          closeDropdown();
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))} 
                </ul> 
               
              </div>
            )}
          </div>
     
        
          
        <div>
          <button className="nav-link">Pages</button>
        </div>
        <div>
          <button className="nav-link">Products</button>
        </div>
        <div>
          <button className="nav-link">Blog</button>
        </div>
        <div>
          <button className="nav-link">Shop</button>
        </div>
        <div>
          <button className="nav-link">Contact </button>
        </div>

        
        </div>
        <form className='Search-box' onSubmit={handleSearch}>
          <input
            type="text"
            placeholder=''
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button type="submit" aria-label="Search">
            <FaSearch />
          </button>

        </form>
        </nav>

       
         

      
      
  );
};

export default Navigation;





      {/* <Router>
      <nav>
        <Link to="/">Home Page</Link> |
         <Link to="/grid">Grid default</Link>|
         <Link to="/shop-list">Shop List</Link>|
         <Link to="/side-bar">Sidebar</Link> | 
         <Link to="/product-details">Product Details</Link>|
          <Link to="/shopping-cart">Shopping Cart</Link> |
          <Link to="/order-complete">Order Complete</Link>|
          <Link to="/hekto-demo">Hekto Demo</Link> |
          <Link to="/my-acc">My Account</Link> |
          <Link to="/blog">Blog</Link> |
          <Link to="/single-blog">Single Blog</Link> |
          <Link to="/about-us">About Us</Link> |
          <Link to= "/contact-us">Contact Us</Link> |
          <Link to= "/not-found">404 Not Found</Link> |
          <Link to= "/faq">Faq</Link>
          
          
      </nav>
      <Routes>
       <Route path="/" element={<div>Home Page</div>}/>
        <Route path="/grid" element={<Default products={products}  />} />
        <Route path="/shop-list" element={<ShopList /> } />
        <Route path="/side-bar" element={<Sidee />} />
        <Route path="/product-details" element={<ProductDetails relates={{
          id: 0,
          image: "",
          name: "",
          rating: 0 ,
          price: 0
        }} />} />
        <Route path="/shopping-cart" element={<ShoppingCart /> } />
        <Route path="/order-complete" element={<OrderComplete /> } />
        <Route path="/hekto-demo" element={<HektoDemo /> } />
        <Route path="/my-acc" element={<MyAcc /> } />
        <Route path="/blog" element={<Blogg Bloggitems={{
          id: 0,
          image: "",
          name: "",
          date: "",
          description: "",
          title: ""
        }} />} />
        <Route path="/single-blog" element={<SingleBlog Blogproduct={{
          id: 0,
          image: "",
          name: "",
          date: "",
          description: "",
          title: ""
        }} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/not-found" element={<NotFound/>} />
        <Route path="/faq" element={<Faq/>} />
        
        
       
        
       
         
      </Routes>
    </Router>
       */}
