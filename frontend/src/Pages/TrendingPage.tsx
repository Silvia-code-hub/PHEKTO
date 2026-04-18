import ProductSection from "../Components/productSection";
import TrendBox from "../Sections/TrendBox";

import DiscGrid from "../Sections/DiscountGrid";
import Layout from "../Components/layout";
import { getTrendingProducts } from "../Services/productService";

const TrendingPage =() => {
    return(
        <div className="trending-container">
            <Layout>
                <div className="trending-sections">
                    <ProductSection 
                        title="Trending Products"
                        fetchProducts={getTrendingProducts}
                        showCarousel={false}
                        itemsPerPage={4} 
                    />
                    <TrendBox/> 
                    <DiscGrid/>
                </div>
            </Layout>
        </div>
    )
}
export default TrendingPage;