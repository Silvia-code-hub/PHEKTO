import "./Footer.css"
import { FaFacebook,FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
const Footer =() =>{
    return(
        <div className="main-container">
            <div className="mainn">
              <div className="main-first">
                 <h2 className="sub"> Hekto</h2>
                 <form action="/submit-email">
                   <input type="email" name="email" id="Enter Email Address" />
                   <button type="submit">Sign Up</button>
                 </form>
                 <p>Contact Info</p>
                 <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
              </div>
              <div className="main-second">
                <h2 className="sub-2">Categories</h2>
                <p>Laptops & Computers</p>
                <p>Cameras & Photography</p>
                <p>Smart Phones & Tablets</p>
                <p>Video Games & Consoles</p>
                <p>Waterproof Headphones</p>
              </div>
              <div className="main-third">
                <h2 className="sub-3">Customer Care</h2>
                <p>My Account</p>
                <p>Discount</p>
                <p>Returns</p>
                <p>Orders History</p>
                <p>Order Tracking</p>
              </div>
              <div className="main-fourth">
                <h2 className="sub-4">Pages</h2>
                <p>Blog</p>
                <p>Browse the Shop</p>
                <p>Category</p>
                <p>Pre-Built Pages</p>
                <p>Visual Composer Elements</p>
                <p>WooCommerce Pages</p>
              </div>
            </div>
            <div className="min">
                <p>©Webecy - All Rights Reserved</p>
                <div className="iconss">
                    <FaFacebook/>
                    <FaInstagramSquare/>
                    <FaTwitterSquare/>

                </div>

            </div>
        </div>

    )
}
export default Footer;