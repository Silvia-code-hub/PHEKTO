import Layout from "../Components/layout";
import type{ Product } from "./EcomItems";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';
import "./Ecom.css"
import "./Default.css"

interface EcomProps{
  
  Types: Product;
}
const Default:React.FC<EcomProps> =({ Types  }) =>{
    console.log('product data:',Types);
    return(
        <Layout>
            <div className="shop-grid-whole">
                <div className="shop-grid-container">
            <h2 className="f-heading"> Shop Grid Default</h2>
            <div className="buttons">
              <div><button className="nav-link">Home</button></div>
              <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
              <ul><li><div><button className="nave-link">Shop Grid Default</button></div></li></ul> 

            </div>
            
        </div>
           <div className="full-container">
            <div className="default-headings">
                <h3 className="headers">Ecommerce Acceories & Fashion item </h3>
                <p className="headers2">About 9,620 results (0.62 seconds)</p>
            </div>
                 <div className="image-container">
                   <img src={Types.image} alt={Types.name} />
                   <div className="icons">
                     <FaShoppingCart/>
                     <FaRegHeart/>
                     <FaSearchPlus/>
           
                   </div>
                 </div>
                 <div className="image-info">
                   <h3 className="image-name">{Types.name}</h3>
                   <div className="color-dots">
                     {Types.colors && Types.colors.map((color: string, index: number) => (
                       <span 
                         key={index} 
                         className="dot" 
                         style={{ backgroundColor: color }}
                       />
                     ))}
           
                   </div>
                   <div className="pricing">
                      <span className="new-price">${Types.price.toFixed(2)}</span>
                      {Types.oldPrice &&(
                     <span className="old-price">${Types.oldPrice.toFixed(2)}</span>
                      )}
                   </div>
                 </div>
               </div>
           

            </div>
        
        
        </Layout>
    )
}
export default Default;