import "./Top.css"
interface TopItem{
    id:number;
    image:string;
    name:string;
    price:number;

}
interface TopProps{
    item:TopItem;
}
const Top: React.FC<TopProps> =({item}) =>{
    
    return(
        
        <div className="top-card">
            <div className="top-image-container">
            <div className="top-image">
               <img src={item.image} alt={item.name} />
               
            </div>
            </div>
            <button className="view-shop-btn">View Shop</button>
            <div className="top-info">
               <h2 className="top-name">{item.name}</h2>
               <div className="top-price">{item.price.toFixed(2)}</div> 
            </div>

         </div>


    )
}
export default Top;