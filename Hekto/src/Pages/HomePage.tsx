import HeroSection from "../Sections/Herosection";
import LandT from "../Sections/LandT";
import Banner from "../Sections/Banner";
import Adt from "../Sections/Adt";
import Layout from "../Components/\Layout";
// import { Link } from "react-router-dom";
// import { Router,Route,Routes} from "react-router-dom"
// import ShopList from "../Grid default/ShopList";

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
            {/* <ul>
                {dropdowns.map((item) =>(
                   <li key={item.id}>
                    <Link to={`/HomePage/${item.id}`}>
                    <h2>{item.title}</h2> */}
                    {/* onClick={(item.Path) }
                    <Router location={""} navigator={}>
                        <Routes>
                            <Route path="/shop-list" element={<ShopList/>}/>
                        
                    </Routes>
                    </Router> */}
                    
                    {/* </Link>
                   </li> 
                ))}
                </ul>  */}
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