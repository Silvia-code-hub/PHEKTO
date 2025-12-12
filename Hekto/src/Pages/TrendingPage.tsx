import TrendGrid from "../Sections/TrendingGrid";
import TrendBox from "../Sections/TrendBox";

import DiscGrid from "../Sections/DiscountGrid";
import Layout from "../Components/Layout";

const TrendingPage =() => {
    return(
        <div className="trending-container">
            <Layout>
                <div className="trending-sections">
                    <TrendGrid/>
                    <TrendBox/> 
                    <DiscGrid/>
                </div>
            </Layout>
        </div>
    )
}
export default TrendingPage;