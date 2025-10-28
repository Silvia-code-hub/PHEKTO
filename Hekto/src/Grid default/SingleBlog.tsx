import Layout from "../Components/layout";
import { FaPenNib } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import {  FaSearch,FaFacebook,FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import "./SingleBlog.css"

interface Blogs{
    id:number;
    image:string;
    name:string;
    price:string;
    oldprice:string;
    rating:number;
}
const Blogproduct:Blogs[]=[
    
    {
        id:1,
        image:"src/assets/images/image_1170.png",
        name:"Quam sed",
        price:"$32.00",
        oldprice:"$56.00",
        rating:4
    },
    
    {
        id:1,
        image:"src/assets/images/image_1170.png",
        name:"Tristique sed",
        price:"$32.00",
        oldprice:"$56.00",
        rating:4
    },
    {
        id:1,
        image:"src/assets/images/image_1170.png",
        name:"A etiam",
        price:"$32.00",
        oldprice:"$56.00",
        rating:4
    },
    {
        id:1,
        image:"src/assets/images/image_1170.png",
        name:"Mi nisi",
        price:"$32.00",
        oldprice:"$56.00",
        rating:4
    },
    
]

const SingleBlog: React.FC<Blogs> = (Blogproduct) => {
    return(
        
            <div className="page">
                <Layout>
                <div className="top-part">
                    <div className="top-box">
                        <h2 className="page-title">Single Blog</h2>
                    <div className="buttons">
                      <div><button className="nav-link">Home</button></div>
                        <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                        <ul><li><div><button className="nave-link">Single Blog</button></div></li></ul>
                    </div>
                    </div>
                    
                </div>
                <div className="lower-part">
                    <div className="lower-left">
                        <div className="image first">
                            <img src="src/assets/images/image_062.jpg" alt="" />
                        </div>
                          <div className="image-icons">
                              <span className="side-icon"><FaPenNib/></span>
                              <span className="side-name">Surf Auxion</span>
                              <span className="side-number"><FaCalendarDays/></span>
                              <span className="side-date">Aug 09 2020</span>
                          </div>
                            <div className="image-info">
                                <h2 className="info-heading">Mauris at orci non vulputate diam tincidunt nec.</h2>
                                <p className="description-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.</p>
                                <div className="image-info2">
                                    <p className="description-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, </p>
                                <p className="description-3">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo dictum sapien, amet, consequat.

                                                               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo dictum sapien, amet, consequat

                                                               toamk risusu”</p>
                                </div>
                                

                            </div>
                                <div className="part-next">
                                    <div className="images-cont">
                                        <video src=""></video>
                                        <img src="src/assets/images/image_064.jpg" alt="" />
                                    </div>
                                    <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc,  </p>

                                </div>
                                <div className="part-lower">
                                    <div className="part-images">
                                        <div className="image-containers">
                                    <img src={Blogproduct.name} alt={Blogproduct.image} />
                                   </div>
                                   <h3 className="image-name">{Blogproduct.name}</h3>
                                   <div className="price-rating">
                                    <div className="pricing">
                                      <span className="new-price">${Number(Blogproduct.price).toFixed(2)}</span>
                                       <span className="old-price">${Number(Blogproduct.oldprice).toFixed(2)}</span>

                                   </div>
                                    <div className="product-rating">
        
                                       {Array(5)
                                        .fill(null)
                                         .map((_, i) => (
                                          <span key={i} className={i < Blogproduct.rating ? 'star-filled' : 'star-empty'}>
                                            ★
                                            </span>
                                          ))}                 

                                         </div>

                                   </div>

                                    </div>
                                    
                                   

                                   
                                   <div className="description-cont">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, </p>
                                   </div>
                                     <div className="icons">
                                                                   <span className="icon0"><FaFacebook/></span>
                                                                   <span className="icon1"><FaInstagramSquare/></span>
                                                                   <span className="icon2"><FaTwitterSquare/></span>
                               
                                                               </div>
                             </div>
                    </div>

                       <div className="lower-right">
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
                </Layout>

            </div>
            
        
    )
}
export default SingleBlog;