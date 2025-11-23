import TrendGrid from "../Sections/TrendingGrid";
import TrendBox from "../Sections/TrendBox";
// import Feature from "../Sections/Discount";
import DiscGrid from "../Sections/DiscountGrid";
import Layout from "../Components/layout";

const TrendingPage =() => {
    return(
        <div className="trending-container">
            <Layout>
                <div className="trending-sections">
                    <TrendGrid/>
                    <TrendBox/>
                    {/* <Feature/> */}
                    <DiscGrid/>
                </div>
            </Layout>
        </div>
    )
}
export default TrendingPage;