import React from 'react';
import ProductSection from '../Components/productSection';
import HeroSection from "../Sections/Herosection";
import { getFeaturedProducts, getLatestProducts, getTrendingProducts } from '../Services/productService';
import TrendBox from "../Sections/TrendBox";
import ShopexCard from "../Sections/ShopexCard";
import DiscGrid from "../Sections/DiscountGrid";
import TopGrid from "../Sections/TopGrid";
import LandT from "../Sections/LandT";
import Banner from "../Sections/Banner";
import Adt from "../Sections/Adt";
import BlogGrid from "../Sections/LeatestBlogGrid";
import Layout from "../Components/layout";



const HomePage =() => {

     const dropdowns =[
        {id:1, title:"Shop list", Path:'/shop-list'},
        {id:2, title:"Side bar"},
        {id:3, title:"Product details"},
        {id:4, title:"Shopping cart"},
        {id:5, title:"Order Complete"},
        {id:6, title:"Hekto Demo"},
        {id:7, title:"My Account"},
        {id:8, title:"Blog"},
        {id:9, title:"Single Blog"},
        {id:10, title:"About Us"},
        {id:11, title:"Contact Us"},
        {id:12, title:"Not Found"},
        {id:13, title:"Faq"},
    ]
   
    return(
        <div className="Homepage-container">
           
        <Layout>
            <div className="homepage-sections">
                <HeroSection/>
             < ProductSection
                title="Featured Products"
                fetchProducts={getFeaturedProducts}
                itemsPerPage={4}
                showCarousel={true}
            />
            <ProductSection 
                title="Latest Products"
                fetchProducts={getLatestProducts}
                itemsPerPage={6}
                showCarousel={true}
            />
            
            <ShopexCard/>
            <LandT/>
            <ProductSection 
                title="Trending Products"
                fetchProducts={getTrendingProducts}
                showCarousel={false}
            />
            <TrendBox/>
            <DiscGrid/>
            <TopGrid/>

                
                <Banner/>
                <Adt/>
                <BlogGrid/>
            </div>
        </Layout>

        </div>
    )
}
export default HomePage;