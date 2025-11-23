import React from "react";
import Layout from "../Components/Layout";
import"./Faq.css"

const Faq: React.FC = () => {
    return(
       

            <div className="faq-page">
                 <Layout>
                 <div className="faq-top">
                      <h2 className="faq-head-title">FAQ</h2>
                         <div className="buttons">
                                <div><button className="nav-link">Home</button></div>
                                <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                                <ul><li><div><button className="nave-link">Faq</button></div></li></ul>
                         </div>
                 </div>
                     <div className="faq-bottom">
                            <div className="faq-bottom-left">
                                      <h3 className="faq-title">General Information</h3>
                                      <h4 className="faq-sub-title">Eu dictumst cum at sed euismood condimentum?</h4>
                                      <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.</p>
                                         <h4 className="faq-sub-title">Magna bibendum est fermentum eros.</h4>
                                         <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.</p>
                                         <h4 className="faq-sub-title">Odio muskana hak eris conseekin sceleton?</h4>
                                         <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.</p>
                                         <h4 className="faq-sub-title">Elit id blandit sabara boi velit gua mara?</h4>
                                         <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.</p>
                                        
                                        
                                        

                            </div>
                               <div className="faq-bottom-right">
                                 <h3 className="faq-title-right">Ask a Question</h3>
                                   <div className="input-part">
                                       <div className="name">
                                          <label htmlFor="name"></label><br />
                                          <input type="text" name="name" id="name" placeholder=" name" />
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
                                   </div>
                               </div>

                     </div>
                      <div className="adt-image">
                                       <img src="src/assets/images/image_015.png" alt="" />
                      </div>
                         
                 </Layout>
            </div>
        
    )
}
export default Faq;