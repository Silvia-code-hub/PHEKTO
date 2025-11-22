import { useState, type FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
    { id: 1, label: 'grid-default', path: '/grid' },
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
    <nav className='flex justify-center items-center gap-6 py-1'>
      <div className='flex justify-between! items-center gap-6'>
        <div className='flex items-center gap-6'>
          <h1 className='text-2xl font-bold'>Hekto</h1>

          <div className='flex items-center gap-6'>
            <nav className="flex justify-between gap-6">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/trending">Trending</Link>
              <Link to="/blog">Blogsss</Link>
            </nav>
            {/* <div className='dropdown-container'>
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
{isDropdownOpen && (
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
</div> */}


          </div>

        </div>
        <form className='' onSubmit={handleSearch}>
          <input
            type="text"
            className='border-2 border-gray-300 rounded-sm p-2'
            placeholder=''
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="navbar-submit" aria-label="Search">
            <FaSearch />
          </button>

        </form>
      </div>
    </nav>






  );
};

export default Navigation;
