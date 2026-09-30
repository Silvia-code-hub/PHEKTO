import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ProtectedRoute from "./Components/ProtectedRoute";


import HomePage from "./Pages/HomePage";
import VerifyEmail from './Pages/VerifyEmail';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Profile from "./Pages/Profile";
import Wishlist from './Pages/Wishlist';

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

import MyProducts from "./Pages/vendor/MyProducts";
import AddProduct from "./Pages/vendor/AddProduct";
import EditProduct from "./Pages/vendor/EditProduct";

import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminUsers from './Pages/admin/AdminUsers';
import AdminProducts from './Pages/admin/AdminProducts';
import AdminOrders from './Pages/admin/AdminOrders';
import AdminVendors from './Pages/admin/AdminVendors';
import AdminCategories from './Pages/admin/AdminCategories';
import VendorOrders from './Pages/vendor/VendorOrders';
import MyOrders from './Pages/MyOrders';
import OrderDetails from './Pages/OrderDetails';


import AuthCallback from './Pages/AuthCallback';






const AppRouter = () => {
    return(
        <Router>
            <AuthProvider>
                <CartProvider>
                   <WishlistProvider> 
                <Routes>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } 
                    />
                    <Route path="/wishlist" element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/my-orders" element={
                          <ProtectedRoute>
                              <MyOrders />
                          </ProtectedRoute>
                      }
                       />
                     <Route path="/order-details/:id" element={
                            <ProtectedRoute>
                                <OrderDetails />
                            </ProtectedRoute>
                        } 
                        />  
                    <Route 
                        path="/vendor/products" 
                        element={
                            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                                <MyProducts />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/vendor/add-product" 
                        element={
                            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                                <AddProduct />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/vendor/edit-product/:id" 
                        element={
                            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                                <EditProduct />
                            </ProtectedRoute>
                        } 
                    />
                    <Route path="/vendor/orders" element={
                         <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                             <VendorOrders />
                         </ProtectedRoute>
                       }
                         />
                        
                        <Route path="/admin/dashboard" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                        <Route path="/admin/users" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminUsers />
                            </ProtectedRoute>
                        } 
                    />
                        <Route path="/admin/products" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminProducts />
                            </ProtectedRoute>
                        }
                     />
                        <Route path="/admin/orders" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminOrders />
                            </ProtectedRoute>
                        } 
                    />
                        <Route path="/admin/categories" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminCategories />
                            </ProtectedRoute>
                        }
                         />
                        <Route path="/admin/vendors" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminVendors />
                            </ProtectedRoute>
                        } 
                    />

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
                    <Route path="/product-details/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>
                    <Route path="/shopping-cart" element={<ProtectedRoute><ShoppingCart/></ProtectedRoute>}/>
                    <Route path="/side-bar" element={<ProtectedRoute><Sidebar/></ProtectedRoute>}/>
                    <Route path="/single-blog" element={<ProtectedRoute><SingleBlog/></ProtectedRoute>}/>

                 <Route path="*" element={<NotFound/>}/>

                
                


                
            </Routes>
            </WishlistProvider>
            </CartProvider>
            </AuthProvider>
        </Router>
    )
}
export default AppRouter;