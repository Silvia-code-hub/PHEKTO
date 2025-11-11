import HeroSection from "../Sections/Herosection";
import LandT from "../Sections/LandT";
import Banner from "../Sections/Banner";
import Adt from "../Sections/Adt";
import Layout from "../Components/layout";

const HomePage =() => {
    return(
        <div className="Homepage-container"> 
        <Layout>
            <div className="homepage-sections">
                <HeroSection/>
                <LandT/>
                <Banner/>
                <Adt/>
            </div>
        </Layout>

        </div>
    )
}
export default HomePage;