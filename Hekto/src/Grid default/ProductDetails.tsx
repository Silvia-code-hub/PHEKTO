import React from "react";
import { FaRegHeart, FaFacebook,FaInstagramSquare, FaTwitterSquare, FaArrowRight } from 'react-icons/fa';

import type { Relates } from "./ProductDetailsItems";
import Layout from "../Components/layout";
import "./ProductDetails.css"
interface ProductDetailsProps{
    relates: Relates;
}






const ProductDetails: React.FC<ProductDetailsProps> = ({ relates }) => {
    const { image, name, rating, price } = relates;

    console.log('ProductDetails - relates data:', relates);
    console.log(' Image:', image);
    console.log(' Name:', name);
    console.log(' Rating:', rating);
    console.log(' Price:', price);

    return(
        
        <div className="main-layer">
            <Layout>
            <div className="part-1">
                <h2 className="product-title">Product Details</h2>
                <div className="buttons">
                  <div><button className="nav-link">Home</button></div>
                  <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link">Product Details</button></div></li></ul> 

                </div>

            </div>

            <div className="part-2">
                <div className="cont-1">
                    <img className="img-a" src="src/assets/images/image_044.jpg" alt="" />
                    <img  className="img-b" src="src/assets/images/image_046.jpg" alt="" />
                    <img  className="img-c" src="src/assets/images/image_051.jpg" alt="" />
                </div>
                <div className="cont-2">
                    <div className="image-container">
                        <img src="src/assets/images/image_045.jpg" alt="" />
                    </div>
                    <div className="info">
                        <h3 className="image-name">Playwood arm chair</h3>
                        <div className="product-rating">
                            {Array(5)
                           .fill(null)
                           .map((_, i) => (
                            <span key={i} className={i < 4 ? 'star-filled' : 'star-empty'}>
                              ★    
                            </span>
                          ))}
                        </div>
                        <div className="price">$32.00 <span className="old-price">$65.00</span></div>
                        <div className="color">Color</div>
                        <div className="description-a">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.</p>
                        </div>
                        <div className="Add-Button">Add To Cart <span className="icon"><FaRegHeart /></span></div>
                        <div className="category">Categories</div>
                        <div className="tags">Tags</div>
                        <div className="share">Share <span className="icons"> 
                            <FaFacebook/>
                            <FaInstagramSquare/>
                             <FaTwitterSquare/>
                            </span>
                         </div>
                    </div>
                </div>

            </div>
               <div className="part-3">
                 <div className="part-3-buttons">
                     <div><button className="nav-link">Description</button></div>
                     <div><button className="nav-link">Additional info</button></div>
                     <div><button className="nav-link">Reviews</button></div> 
                     <div><button className="nav-link">Video</button></div>
                  </div>
                    <div className="description-text">
                        <h4 className="sub-heading">Varius tempor.</h4>
                        <p>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
                        <h4 className="sub-heading">More details</h4>
                        <p><span><FaArrowRight/></span>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
                        <p><span><FaArrowRight/></span>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
                        <p><span><FaArrowRight/></span>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
                        <p><span><FaArrowRight/></span>Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet. Montes, mauris varius ac est bibendum. Scelerisque a, risus ac ante. Velit consectetur neque, elit, aliquet. Non varius proin sed urna, egestas consequat laoreet diam tincidunt. Magna eget faucibus cras justo, tortor sed donec tempus. Imperdiet consequat, quis diam arcu, nulla lobortis justo netus dis. Eu in fringilla vulputate nunc nec. Dui, massa viverr .</p>
                    </div>
               </div>
               <div className="part-4">
                <h3 className="related-product">Related Products</h3>
                <div className="related-images">
                    <div key={relates.id}>
                    <img src={relates.image} alt={relates.name}
                     />
                     </div>
                </div>
                <div className="images-info">
                    <div className="name-rate">
                        <h3 className="image-name">{relates.name}</h3>
                        <div className="product-rating">
                            {Array(5)
                           .fill(null)
                           .map((_, i) => (
                            <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>
                              ★    
                            </span>
                          ))}
                        </div>
                    </div>
                    <div className="price">${price}
                           
                    </div>
                </div>

               </div>
               </Layout>
        </div>
        
    )
    
}
export default ProductDetails;