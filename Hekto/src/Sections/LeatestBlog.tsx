import "./LeatestBlog.css"
import { FaPenNib } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
interface BlogItem{
    id:number;
    image:string;
    name:string;
    date:string;

}
interface BlogProps{
    item:BlogItem;
}
const Blog: React.FC<BlogProps> =({item}) =>{
    return(
        <div className="blog-container">
            <div className="blog-img">
                 <img src={item.image} alt={item.image} />
            </div>
            <div className="blog-icon">
               
                <div key={item.id} className="blog-item">
                        <span className="blogg-icon"><FaPenNib/></span>
                           <span className="blog-name">{item.name}</span>
                               <span className="blog-number"><FaCalendarDays/></span>
                                   <span className="blog-date">{item.date}</span>
                    </div>
                         
                    

                
            </div>
            <div className="blog-info">
                <h2 className="blog-sub">Top essential trends in 2021</h2>
                <p >More off this less hello samlande lied much over tightly circa horse taped mightly</p>
                <button className="read-more-btn">Read More</button>
            </div>
        </div>
    )
}
export default Blog;