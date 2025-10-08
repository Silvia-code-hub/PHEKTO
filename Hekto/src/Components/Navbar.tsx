import { useState } from 'react';   
import './Navbar.css'
import { FaSearch } from 'react-icons/fa';



    const Navigation = () => {
  const [] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('')

    
    
  const handleSearch = (e: React.FormEvent) =>{
    e.preventDefault();
    console.log(searchQuery);
  }

    return (
      <nav className='navbar'>
        <h1>Hekto</h1>
      
        <div className='nav-container'>
     
        
          <div>
           <button className="nav-link">Home</button>
           
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

