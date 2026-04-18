 
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
        date:"21 August,2020"
       }, 
        {
        id:2,
        image:"src/assets/images/image_018.jpg",
        name:"Surfauxion",
        date:"21 August,2020"
       } ,
        {
        id:3,
        image:"src/assets/images/image_017.jpg",
        name:"SaberAli",
        date:"21 August,2020"
       } 
    ];
    return(
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 ">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-blue-shade mb-6 md:mb-10 text-center">Leatest Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center max-w-7xl mx-auto">
                {items.map(item => (
                    <Blog key={item.id} item={item} />
                ))}
            </div>
        </div>
    )

}
export default BlogGrid;
    