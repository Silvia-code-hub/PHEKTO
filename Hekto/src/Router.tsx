import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import ProductsPage from "./Pages/ProductsPage";
import TrendingPage from "./Pages/TrendingPage";
import BlogPage from "./Pages/BlogPage";
// import SubRoutes from "./Grid default/SubRoutes";
import Default from "./Grid default/Default";
import { products } from "./Grid default/Defaultitems";
import ShopList from "./Grid default/ShopList";





const AppRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/trending" element={<TrendingPage/>}/>
                <Route path="/blog" element={<BlogPage/>}/>
                {/* <Route path="/Subroutes" element={<SubRoutes/>}/> */}
                <Route path="/grid" element={<Default products={products}  />} />
                <Route path="/shop-list" element={<ShopList /> } />
                
                {/* <Route path="//:id" element={<dropdowns/>}/> */}
                


                
            </Routes>
        </Router>
    )
}
export default AppRouter;