import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import HomePage from "./Pages/HomePage";
import VerifyEmail from './Pages/VerifyEmail';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

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
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />


                    <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                    <Route path="/products" element={<ProtectedRoute><ProductsPage/></ProtectedRoute>}/>
                    <Route path="/trending" element={<ProtectedRoute><TrendingPage/></ProtectedRoute>}/>
                    <Route path="/blog" element={<ProtectedRoute><BlogPage/></ProtectedRoute>}/>
                    <Route path="/shop-list" element={<ProtectedRoute><ShopList/></ProtectedRoute>}/>
                    <Route path="/grid" element={<ProtectedRoute><Default /></ProtectedRoute>}/>
                    <Route path="/about-us" element={<ProtectedRoute><AboutUs/></ProtectedRoute>}/>
                    <Route path="/contact-us" element={<ProtectedRoute><ContactUs/></ProtectedRoute>}/>
                    <Route path="/faq" element={<ProtectedRoute><Faq/></ProtectedRoute>}/>   
                    <Route path="/hekto-demo" element={<ProtectedRoute><HektoDemo/></ProtectedRoute>}/>
                    <Route path="/my-account" element={<ProtectedRoute><MyAcc/></ProtectedRoute>}/>
                    <Route path="/order-complete" element={<ProtectedRoute><OrderComplete/></ProtectedRoute>}/>
                    <Route path="/product-details" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
                    <Route path="/shopping-cart" element={<ProtectedRoute><ShoppingCart/></ProtectedRoute>}/>
                    <Route path="/side-bar" element={<ProtectedRoute><Sidebar/></ProtectedRoute>}/>
                    <Route path="/single-blog" element={<ProtectedRoute><SingleBlog/></ProtectedRoute>}/>

                 <Route path="*" element={<NotFound/>}/>

                {/* <Route path="//:id" element={<dropdowns/>}/> */}
                


                
            </Routes>
            </AuthProvider>
        </Router>
    )
}
export default AppRouter;