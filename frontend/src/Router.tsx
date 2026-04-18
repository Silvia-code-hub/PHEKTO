import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import HomePage from "./Pages/HomePage";
import VerifyEmail from './Pages/VerifyEmail';
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import ProductsPage from "./Pages/ProductsPage";
import TrendingPage from "./Pages/TrendingPage";
import BlogPage from "./Pages/BlogPage";
import ShopList from "./Grid default/ShopList";
import Default from "./Grid default/Default";
import AboutUs from "./Grid default/AboutUs";
import ContactUs from "./Grid default/ContactUs";
import Faq from "./Grid default/Faq";
import HektoDemo from "./Grid default/HektoDemo";
import MyAcc from "./Grid default/MyAcc";
import NotFound from "./Grid default/NotFound";
import OrderComplete from "./Grid default/OrderComplete";
import ProductDetails from "./Grid default/ProductDetails";
import ShoppingCart from "./Grid default/ShoppingCart";
import Sidebar from "./Grid default/Sidebar";
import SingleBlog from "./Grid default/SingleBlog";






const AppRouter = () => {
    return(
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/" element={
                        
                        <HomePage/>}/>

                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/trending" element={<TrendingPage/>}/>
                <Route path="/blog" element={<BlogPage/>}/>
                <Route path="/shop-list" element={<ShopList/>}/>
                <Route path="/grid" element={<Default />}/>
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/contact-us" element={<ContactUs/>}/>
                <Route path="/faq" element={<Faq/>}/>   
                <Route path="/hekto-demo" element={<HektoDemo/>}/>
                <Route path="/my-account" element={<MyAcc/>}/>
                <Route path="/order-complete" element={<OrderComplete/>}/>
                <Route path="/product-details" element={<ProductDetails/>}/>
                <Route path="/shopping-cart" element={<ShoppingCart/>}/>
                <Route path="/side-bar" element={<Sidebar/>}/>
                <Route path="/single-blog" element={<SingleBlog/>}/>

                 <Route path="*" element={<NotFound/>}/>

                {/* <Route path="//:id" element={<dropdowns/>}/> */}
                


                
            </Routes>
            </AuthProvider>
        </Router>
    )
}
export default AppRouter;