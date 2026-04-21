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