
import Layout from "./layout";
import HeroSection from "../Sections/Herosection";
import ProductGrid from "../Sections/ProductGrid";
import LeastGrid from "../Sections/LeatestGrid";
import ShopexCard from "../Sections/ShopexCard";
import LandT from "../Sections/LandT";
import TrendGrid from "../Sections/TrendingGrid";
import TrendBox from "../Sections/TrendBox";
import Feature from "../Sections/Discount";
import DiscGrid from "../Sections/DiscountGrid";
import TopGrid from "../Sections/TopGrid";
import Banner from "../Sections/Banner";
import Adt from "../Sections/Adt";
import BlogGrid from "../Sections/LeatestBlogGrid";

const HomePage =() =>{
    return(
       <div>
        <Layout>
            <HeroSection/>
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



            
        </Layout>
       </div>

    )
}
export default HomePage;