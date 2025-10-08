import Layout from "../Components/layout";
import "./HektoDemo.css"
const HektoDemo: React.FC = () => {
    return(
        <Layout>
            <div className="main-cont">
                <div className="title">
                    <h2 className="main-heading">Hekto Demo</h2>
                </div>
                <div className="sub">
                    <h3 className="sub-head">Hekto Demo</h3>
                    <p className="sub-description">Cart/ Information/ Shipping/ Payment</p>
                </div>
                <div className="big-cont">
                    <div className="left">
                        <div className="left-inner">
                            <div className="sentences">
                            <h4 className="title-s">Contact Information</h4>
                            <p className="para">Already have an account? Log in</p>
                        </div>
                        
                        <div className="input-field">
                             
                            <div className="input-fields">
                            <input type="text" placeholder="Email or mobile phone number" className="input"/>
                            </div>
                        </div>

                         <div className="check">
                            <input type="checkbox" className="box"/>
                            <p className="part">Keep me up to date on news and exclusive offers</p>
                         </div>
                            <div className="shipping-add">
                                <h4 className="title-sh">Shipping Address</h4>
                            </div>
                            <div className="input-fields">
                                <input type="text" placeholder="First name (optional)" className="input"/><br/>
                                <input type="text" placeholder="Last name" className="input"/><br/>
                            </div>
                            <div className="input-fields">
                                <input type="text" placeholder="Address" className="input"/><br/>
                                <input type="text" placeholder="Apartment, suite, etc. (optional)" className="input"/><br/>
                                <input type="text" placeholder="City" className="input"/><br/>
                            </div>
                            <div className="input-fields">
                                <input type="text" placeholder="Bangladesh" className="input"/><br/>
                                <input type="text" placeholder="Postal Code" className="input"/>
                            </div>
                            <div className="Button">

                                <button className="sh-btn">Continue Shipping</button>
                            </div>

                        </div>
                        

                        
                    
                    </div>
                    <div className="right">
                        <div className="items">

                            <div className="prod">
                                <div className="image-cont">
                                    <img src="src/assets/images/image_057.jpg" alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">Ut diam consequat</h4>
                                    <p className="color">Color:Brown</p>
                                    <p className="size">Size:XL</p>
                                    <div className="price-r">
                                        <p className="price">$32.00</p>
                                    </div>
                                    
                                </div>
                            </div>
                             <div className="prod">
                                <div className="image-cont">
                                    <img src="src/assets/images/image_061.jpg" alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">Ut diam consequat</h4>
                                    <p className="color">Color:Brown</p>
                                    <p className="size">Size:XL</p>
                                    <div className="price-r">
                                    <p className="price">$32.00</p>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                             <div className="prod">
                                <div className="image-cont">
                                    <img src="src/assets/images/image_060.jpg" alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">Ut diam consequat</h4>
                                    <p className="color">Color:Brown</p>
                                    <p className="size">Size:XL</p>
                                      <div className="price-r">
                                          <p className="price">$32.00</p>
                                      </div>
                                
                                    
                                </div>
                            </div>
                             <div className="prod">
                                <div className="image-cont">
                                    <img src="src/assets/images/image_059.jpg" alt="" />
                                </div>
                                <div className="info">
                                    <h4 className="name">Ut diam consequat</h4>
                                    <p className="color">Color:Brown</p>
                                    <p className="size">Size:XL</p>
                                       <div className="price-r">
                                          <p className="price">$32.00</p>
                                       </div>

                                    
                                </div>
                            </div>
                             <div className="prod">
                                <div className="image-cont">
                                    <img src="src/assets/images/image_058.jpg" alt="src/assets/images/image_058.jpg" />
                                </div>
                                <div className="info">
                                    <h4 className="name">Ut diam consequat</h4>
                                    <p className="color">Color:Brown</p>
                                    <p className="size">Size:XL</p>
                                        <div className="price-r">
                                           <p className="price">$32.00</p>
                                       </div>
                                    
                                </div>
                            </div>
                            <div className="totals-cont">
                                <div className="sub-total">
                                    <h4 className="text">Subtotals:</h4>
                                    <p className="amount">$219.00</p>
                                </div>
                                <div className="totals">
                                    <h4 className="text">Total:</h4>
                                    <p className="amount">$325.00</p>
                                </div>
                                <div className="check">
                                   <input type="checkbox" className="box"/>
                                   <p className="part">Shipping & taxes calculated at checkout</p>
                                </div>
                                <div className="Button">
                                    <button className="checkout-btn">Proceed To Checkout</button>
                                </div>
                            </div>
                            
                            

                        </div>
                    </div>

                </div>
            </div>
            </Layout>
    );
}
export default HektoDemo;