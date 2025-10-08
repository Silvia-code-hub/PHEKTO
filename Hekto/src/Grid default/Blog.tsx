import type { Blog } from "./BlogItems";
import Layout from "../Components/layout";
import { FaPenNib } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaSearch ,FaFacebook,FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import "./Blog.css"

interface BlogstuffProps{
   Bloggitems:Blog;
}
const Blogg: React.FC<BlogstuffProps> = ({ Bloggitems }) => {
    return (
        <Layout>
            <div className="whole-page">
                <div className="blog-page">
                    <h2 className="page-title">Blog Page</h2>
                    <div className="buttons">
                         <div><button className="nav-link">Home</button></div>
                         <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                         <ul><li><div><button className="nave-link">Blog Page</button></div></li></ul> 
                    </div>
                </div>
                <div className="remaining-part">
                    <div className="side-right">
                        <div className="side-image">
                            <img src={Bloggitems.image} alt={Bloggitems.image} />
                        </div>
                        <div  className="side-icons">
                            <div key={Bloggitems.id} className="side-item">
                                <span className="side-icon"><FaPenNib/></span>
                                <span className="side-name">{Bloggitems.name}</span>
                                <span className="side-number"><FaCalendarDays/></span>
                                <span className="side-date">{Bloggitems.date}</span>
                            </div>

                        </div>
                        <div className="side-info">
                            <h2 className="side-title">{Bloggitems.title}</h2>
                            <p className="side-description">{Bloggitems.description}</p>
                            <div className="button">
                                <button className="side-read-more-btn">Read More</button>
                            </div>
                        </div>
                    </div>
                    <div className="side-left">
                         <div className="search">
                                <h3 className="search-heading">Search</h3>
                              <input type="text" placeholder="Search For Posts  " /> <FaSearch/>
                              
                         </div>
                          <div className="categories">
                              <h3 className="categories-heading">Categories</h3>
                              <div className="categories-lists">
                                <ul className="categories-list-1">
                                   <li>Hobbies(14)</li>
                                  <li>Women(21)</li>
                                  <li>Women(21)</li>
                               </ul>  
                              <ul className="categories-list-2">
                                  <li>Women(21)</li>
                                  <li>Women(21)</li>
                                  <li>Women(21)</li>
                                </ul>  

                              </div>
                             
                           </div>

                           <div className="recent-posts">
                                <h3 className="recent-posts-heading">Recent Posts</h3>
                                <div className="post-big-container">
                                     <div className="post-container">
                                    <div className="post-img">
                                        <img src="src/assets/images/image_016.jpg" alt="" />
                                    </div>
                                    <div className="post-info">
                                        <h4 className="post-title">It is a long established fact</h4>
                                        <span className="post-date">Aug 09 2020</span>
                                    </div>
                                     <div className="post-img">
                                        <img src="src/assets/images/image_016.jpg" alt="" />
                                    </div>
                                    <div className="post-info">
                                        <h4 className="post-title">It is a long established fact</h4>
                                        <span className="post-date">Aug 09 2020</span>
                                    </div>
                                    <div className="post-img">
                                        <img src="src/assets/images/image_016.jpg" alt="" />
                                    </div>
                                    <div className="post-info">
                                        <h4 className="post-title">It is a long established fact</h4>
                                        <span className="post-date">Aug 09 2020</span>
                                    </div>
                                    <div className="post-img">
                                        <img src="src/assets/images/image_016.jpg" alt="" />
                                    </div>
                                    <div className="post-info">
                                        <h4 className="post-title">It is a long established fact</h4>
                                        <span className="post-date">Aug 09 2020</span>
                                    </div>

                                </div>
                                

                                </div>
                           </div>
                            <div className="sale-product">
                                <h3 className="sale-product-heading">Sale Products</h3>
                                 <div className="sale-big-container">
                                    <div className="sale-container">
                                    <div className="sale-img">
                                        <img src="src/assets/images/image_017.jpg" alt="" />
                                    </div>
                                    <div className="sale-info">
                                        <h4 className="sale-title">Elit ornare in enim mauris.</h4>
                                        <span className="sale-date">Aug 09 2020</span>
                                    </div>

                                     <div className="sale-img">
                                        <img src="src/assets/images/image_017.jpg" alt="" />
                                    </div>
                                    <div className="sale-info">
                                        <h4 className="sale-title">Viverra pulvinar et enim.</h4>
                                        <span className="sale-date">Aug 09 2020</span>
                                    </div>

                                      <div className="sale-img">
                                        <img src="src/assets/images/image_017.jpg" alt="" />
                                    </div>
                                    <div className="sale-info">
                                        <h4 className="sale-title">Mattis varius donec fdsfd</h4>
                                        <span className="sale-date">Aug 09 2020</span>
                                    </div>

                                 </div>
                                

                                </div> 

                            </div>
                              
                             <div className="offer-product">
                                <h3 className="offer-product-heading">Offer product</h3>
                                 <div className="offer-big-cont">
                                    <div className="offer-1">
                                     <div className="offer-images">
                                <img src="src/assets/images/image_018.jpg" alt="" />

                              </div>
                              <div className="offer-info">
                                <h4 className="offer-title">Duis lectus est.</h4>
                                <span className="price-range">$12.00 - $15.00</span>
                              </div>
                             <div className="offer-images">
                                 <img src="src/assets/images/image_018.jpg" alt="" />

                              </div>
                              <div className="offer-info">
                                 <h4 className="offer-title">Netus proin.</h4>
                                 <span className="price-range">$12.00 - $15.00</span>
                              </div>

                                </div>

                                
                               <div className="offer-2">
                                     <div className="offer-images">
                                            <img src="src/assets/images/image_018.jpg" alt="" />
                                         </div>
                                      <div className="offer-info">
                                          <h4 className="offer-title">Sed placerat.</h4>
                                         <span className="price-range">$12.00 - $15.00</span>
                                       </div>
                                        <div className="offer-images">
                                           <img src="src/assets/images/image_018.jpg" alt="" />

                                        </div>
                                       <div className="offer-info">
                                         <h4 className="offer-title">Platea in.</h4>
                                         <span className="price-range">$12.00 - $15.00</span>
                                      </div>
                                 </div>

                                 </div>
                                
                              </div>
                              <div className="follow">
                                <h3 className="follow-heading">Follow </h3>
                                <div className="icons">
                                    <span className="icon0"><FaFacebook/></span>
                                    <span className="icon1"><FaInstagramSquare/></span>
                                    <span className="icon2"><FaTwitterSquare/></span>

                                </div>
                              </div>

                              <div className="tags">
                                <h3 className="tags-heading">Tags</h3>
                                <div className="tag-list">
                                    <span className="tag-item">General</span>
                                    <span className="tag-item">Atsanil</span>
                                    <span className="tag-item">Insas.</span>
                                    <span className="tag-item">Bibsaas</span>
                                    <span className="tag-item">Nulla.</span>

                                </div>
                              </div>
                              
                    </div>
                </div>
                <div className="adt-image">
                   <img src="src/assets/images/image_015.png" alt="" />
               </div>

            </div>

        
        </Layout>
    );
};
export default Blogg;