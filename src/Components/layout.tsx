import Header from "./Header";
import Navigation from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>

      <Header />
      <Navigation />


      <main className="px-4 rounded-lg">
        {children}
      </main>

      <Footer />
    </div>
  )
}
export default Layout;