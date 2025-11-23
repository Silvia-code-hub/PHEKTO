import ProductGrid from "../Sections/ProductGrid";
import LeastGrid from "../Sections/LeatestGrid";
import ShopexCard from "../Sections/ShopexCard";
import TopGrid from "../Sections/TopGrid";
import Layout from "../Components/Layout";

const ProductsPage =() => {
    return(
        <div className="products-container">
            <Layout>
                <div className="products-sections">
                    <ProductGrid/>
                    <LeastGrid/>
                    <ShopexCard/>
                    <TopGrid/>
                </div>
            </Layout>
        </div>
    )
}
export default ProductsPage;