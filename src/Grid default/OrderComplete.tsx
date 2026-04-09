import Layout from "../Components/layout";
import "./OrderComplete.css"
import { FaRegClock } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";

const OrderComplete:React.FC = () => {
    return(
        

         <div className="order-complete">
            <Layout>

            <div className="order-head">
                <h2 className="first-heading"> Order Completed</h2>
                <div className="buttons">
                  <div><button className="nav-link">Home</button></div>
                  <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link">Shopping cart</button></div></li></ul> 

                </div>
            </div>
            <div className="centre">
                <div className="first-icon">
                    <FaRegClock/>
                </div>
                <div className="sec-centre">
                    <h2 className="sec-title">Your Order Is Completed! </h2>
                    <p className="sec-description">Thank you for your order! Your order is being processed and will be completed within 3-6
                       hours. You will receive an email confirmation when your order is completed.</p>
                          <button className="continue-btn">Continue Shopping</button>
                </div>
                <div className="third-icon">
                    <FaClipboardList/>

                </div>
            </div>
            <div className="adt-image">
            <img src="src/assets/images/image_015.png" alt="" />
          </div>
           </Layout>
        </div>
       
    );
};
export default OrderComplete;