import "./Discount.css"
import { TiTick } from "react-icons/ti";
interface Feature {
  id: number;
  text: string;
}
const Feature =() =>{
    const items: Feature[] =[
    { id: 1, text: "Material expose like metals" },
    { id: 2, text: "Simple neutral colours." },
    { id: 3, text: "Clear lines and geomatric figures" },
    { id: 4, text: "Material expose like metals" }
    ];
    return(
        <div className="Item">
            <div className="item-info">
                <h2 className="heading">20% Discount Of All Products</h2>
                <h4 className="heading-2">Eams Sofa Compact</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget feugiat habitasse nec, bibendum condimentum.</p>
                <div className="tick-list">
                    {items.map((item) => (
                 <div key={item.id} className="tick-item">
                     <span className="tick-icon"><TiTick/></span>
                        <span className="tick-text">{item.text}</span>
                    </div>
                    ))}
                </div>
                <button className="shop-btn"> Shop Now</button>

            </div>
            <div className="item-image">
                <img src="src/assets/images/image_012.png" alt="" />

            </div>
        </div>

    )
}
export default Feature;