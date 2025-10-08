import Layout from "../Components/layout"
import "./ContactUs.css"
interface colors{
    id: number;
    color: string;
}
const colors: colors[] = [
    { id: 1, color: '#FF5733' },
    { id: 2, color: '#33FF57' },
    { id: 3, color: '#3357FF' },
]

const ContactUs:React.FC = () => {
    return(
        <Layout>

            <div className="bigpage">
                  <div className="upper">
                    <h2 className="upper-heading">Contact Us</h2>
                    <div className="buttons">
                        <div><button className="nav-link">Home</button></div>
                         <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                         <ul><li><div><button className="nave-link">Contact Us</button></div></li></ul>
                    </div>
                  </div>
                      <div className="lower">
                          <div className="first">
                               <div className="first-info">
                                     <h3 className="title-info">Information About us</h3>
                                      <p className="sub-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.</p>
                                    <div className="color-dots">
                                         {colors.map((_color, id) => (
                                           <span 
                                          key={id} 
                                          className="dot" 
                                          style={{ }}
                                          />
                                           ))}
                        
                                    </div>

                                    <div className="first-info-next">
                                           <h3 className="info-next">Get In Touch</h3>
                                           <p className="info-sub"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices  tristique amet erat vitae eget dolor los vitae lobortis quis bibendum quam.</p>
                                    </div>

                               </div>
                                   <div className="second-info">
                                         <h3 className="second-head">Contact Way</h3>
                                           
                                           <ellipse className="circle"> 
                                            <p className="contact1">Tel: 877-67-88-99</p>
                                             <p>E-Mail: shop@store.com</p> </ellipse>

                                              <ellipse className="circle"> <p className="contact2">20 Margaret st, London</p>
                                                 <p>Great britain, 3NM98-LK</p> </ellipse>

                                                   <ellipse className="circle"> <p className="contact3">Support Forum</p>
                                                     <p>For over 24hr</p> </ellipse>
                                                     <ellipse className="circle"> <p className="contact4">Free standard shipping</p>
                                                     <p>on all orders.</p> </ellipse>
                                                                         


                                   </div>
                          </div>
                      <div className="second">
                            <div className="input-part">
                              <div className="input-part-a">
                                 <div className="name">
                                      <label htmlFor="name"></label><br />
                                      <input type="text" name="name" id="name" placeholder=" name" />
                                 </div>
                                    <div className="email">
                                      <label htmlFor="name"></label><br />
                                      <input type="email" name="email" id="email" placeholder=" email" />
                                 </div>

                              </div>
                                 
                                    <div className="subject">
                                      <label htmlFor="subject"></label><br />
                                      <input type="text" name="subject" id="subject" placeholder=" subject" />

                                 </div>
                                    <div className="message">
                                      <label htmlFor="text"></label><br />
                                      <input type="text" name="text" id="text" placeholder=" Write Your Message" />
                                 </div>
                                 <div className="button">
                                    <button className="send-btn">Send Mail</button>
                                 </div>

                                 <div className="svg-img"></div>


                      </div>

                              


                                 

                              </div>
                      </div>
            </div>


        </Layout>
    )
}
export default ContactUs;