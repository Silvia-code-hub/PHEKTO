import Layout from "../Components/layout"
import ShopexItem from "../Sections/ShopexCard";
import "./AboutUs.css"
const AboutUs = () => {
    return(
        <Layout>

            <div className="full">
                <div className="top">
                    <h2 className="top-header">About Us</h2>
                    <div className="buttons">
                        <div><button className="nav-link">Home</button></div>
                         <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                         <ul><li><div><button className="nave-link">About Us</button></div></li></ul> 

                    </div>

                </div>
                      <div className="bottom">
                          <div className="container1">
                                <div className="image-part">
                                    <img src="src/assets/images/image_066.jpg" alt=""/>

                                </div>
                                       <div className="image-part-info">
                                        <h2 className="title-image">Know About Our Ecomerce
                                                              Business, History</h2>
                                        <p className="more-info"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.</p>
                                        <button className="contact-btn"> Contact us</button>
                                       </div>
                          </div> 
                                <div className="container2">
                                    <h2 className="heading"> Our Features</h2>
                                    <ShopexItem/>

                                </div>
                                      <div className="container3">
                                        <h2 className="header"> Our Client Say</h2>
                                        <div className="images-cont">
                                            <img src="src/assets/images/image_068.jpg" alt="" />
                                            <img src="src/assets/images/image_067.jpg" alt="" />
                                            <img src="src/assets/images/image_064.jpg" alt="" />
                                        </div>
                                            <div className="images-info">
                                                <h3 className="name">Selina Gomez</h3>
                                                <p className="role">Ceo At Webecy Digital</p>
                                                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor aliquam lacus volutpat praesent.</p>
                                            </div>
                                      </div>

                      </div>
            </div>


        </Layout>
    )
}
export default AboutUs;