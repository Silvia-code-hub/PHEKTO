import Header from "./Components/Header";
import Navbar from './Components/Navbar';
import './App.css'
import Herosection from "./Sections/Herosection";
import ProductGrid from "./Sections/ProductGrid";
import LeastGrid from "./Sections/LeatestGrid";
import ShopexCard from "./Sections/ShopexCard";
import LandT from "./Sections/LandT";
import TrendGrid from "./Sections/TrendingGrid";
import TrendBox from "./Sections/TrendBox";
import Feature from "./Sections/Discount";
import DiscGrid from "./Sections/DiscountGrid";
import TopGrid from "./Sections/TopGrid";
import Banner from "./Sections/Banner";
import Adt from "./Sections/Adt";
import BlogGrid from "./Sections/LeatestBlogGrid";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Default from "./Grid default/Default";
import { products } from "./Grid default/Defaultitems";
import ShopList from "./Grid default/ShopList";
import Sidee from "./Grid default/Sidebar";
import ProductDetails from "./Grid default/ProductDetails";
import ShoppingCart from "./Grid default/ShoppingCart";
import OrderComplete from "./Grid default/OrderComplete";
import HektoDemo from "./Grid default/HektoDemo";
import MyAcc from "./Grid default/MyAcc";
import Blogg from "./Grid default/Blog";
import SingleBlog from "./Grid default/SingleBlog";
import AboutUs from "./Grid default/AboutUs";
import ContactUs from "./Grid default/ContactUs";
import NotFound from "./Grid default/NotFound";
import Faq from "./Grid default/Faq";




function App() {
 

  return (
    <>
      <div>
     <Header/>
     <Navbar/>
     <Herosection/>
     <ProductGrid/>
     <LeastGrid/>
     <ShopexCard/>
     <LandT/>
     <TrendGrid/>
     <TrendBox/>
     <Feature/>
     <DiscGrid/>
     <TopGrid/>
     <Banner/>
     <Adt/>
     <BlogGrid/>
     <Footer/>
     
      </div>
      <Router>
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
      
    </>
  )
}

export default App
