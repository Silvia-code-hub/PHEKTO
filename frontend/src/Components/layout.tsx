import Header from "./Header";
import Navigation from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

interface LayoutProps {
      children: React.ReactNode;
    }
    const Layout: React.FC<LayoutProps> = ({ children }) =>{
        return(
            <div>
               <nav className="navigations">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/blog">Blog</Link>
               </nav>
                <Header/>
                <Navigation/>
                

                 <main style={{ padding: '2rem' }}>
            {children}
          </main> 
          
          <Footer />
            </div>
        )
    }
    export default Layout;