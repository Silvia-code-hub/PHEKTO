import "./LeatestBlogGrid.css"
import Blog from "./LeatestBlog"
interface BlogItem{
    id:number;
    image:string;
    name:string;
    date:string;
}
const BlogGrid: React.FC = () =>{
    const items:BlogItem[]=[
       {
        id:1,
        image:"src/assets/images/image_016.jpg",
        name:"SaberAli",
        date:"21 August 2020"
       }, 
        {
        id:2,
        image:"src/assets/images/image_018.jpg",
        name:"Surfauxion",
        date:"21 August 2020"
       } ,
        {
        id:3,
        image:"src/assets/images/image_017.jpg",
        name:"SaberAli",
        date:"21 August 2020"
       } 
    ];
    return(
        <div className="blog-grid-container">
            <h2 className="blog-title">Leatest Blog</h2>
            <div className="blog-grid">
                {items.map(item => (
                    <Blog key={item.id} item={item} />
                ))}
            </div>
        </div>
    )

}
export default BlogGrid;
    