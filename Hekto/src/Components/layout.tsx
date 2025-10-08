import Header from "./Header";
import Navigation from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
      children: React.ReactNode;
    }
    const Layout: React.FC<LayoutProps> = ({ children }) =>{
        return(
            <div>
                <Header/>
                <Navigation/>
                <main style={{ padding: '2rem' }}>
            {children} {/* This is where your page content will be rendered */}
          </main>
          <Footer />
            </div>
        )
    }
    export default Layout;