import { useState, type Key, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import { FaSearch, FaChevronUp, FaChevronDown } from 'react-icons/fa';



const Navigation = () => {
  const navigate = useNavigate();
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
                         navigate(item.path)
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

