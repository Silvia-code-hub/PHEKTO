import Top from "./Top";
import "./TopGrid.css"
interface TopItem{
    id:number;
    image:string;
    name:string;
    price:number;

}
const TopGrid: React.FC = () =>{
    const items:TopItem[]=[
        {
            id:1,
            image:"src/assets/images/image_013.png",
            name:"Mini LCW Chair",
            price:56.00,
        },
        {
            id:2,
            image:"src/assets/images/image_0.png",
            name:"Mini LCW Chair",
            price:56.00,
        },
        {
            id:3,
            image:"src/assets/images/image_07.png",
            name:"Mini LCW Chair",
            price:56.00,
        },
        {
            id:4,
            image:"src/assets/images/image_013.png",
            name:"Mini LCW Chair",
            price:56.00,
        }

    ];
    return(
         <div className="top-grid-container">
            <h2 className="top-title">Top Categories</h2>
            <div className="top-grid">
                {items.map(item => (
                    <Top key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
export default TopGrid;