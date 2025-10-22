import Layout from "../Components/layout";
import type{ Product } from "./Defaultitems";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';
import "./Default.css"

interface EcomProps{
  
  products: Product[];
}
const Default:React.FC<EcomProps> =({ products  }) =>{
    console.log('product data:',products);
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
             <div className="products-grid">
              {products.map((product) =>(
                <div key={product.id} className="product-card">
                  <div className="image-container">
                   <img src={product.image} alt={product.name} />
                   <div className="icons">
                     
                     <FaRegHeart/>
                     <FaSearchPlus/>
                     <FaShoppingCart/>
           
                   </div>
                 </div>
                 <div className="image-info">
                   <h3 className="image-name">{product.name}</h3>
                   <div className="default-color-dots">
                     {product.colors && product.colors.map((color: string, index: number) => (
                       <span 
                         key={index} 
                         className="dot" 
                         style={{ backgroundColor: color }}
                       />
                     ))}
           
                   </div>
                   <div className="pricing">
                      <span className="new-price">${product.price.toFixed(2)}</span>
                      {product.oldPrice &&(
                     <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                      )}
                   </div>
                 </div>
               </div>
              ))}
             </div>
                <div className="adt-image">
               <img src="src/assets/images/image_015.png" alt="" />
          </div> 
           

            </div>
        
        </div>
        </Layout>
    )
}
export default Default;