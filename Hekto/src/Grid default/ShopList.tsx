import{  Type, type shop  } from "./ShopListItems";
import "./ShopList.css"
import Layout from "../Components/layout";
import { FaShoppingCart,FaRegHeart,FaSearchPlus } from 'react-icons/fa';
interface ShopListItemProps {
  item: shop;
}

const ShopListItem: React.FC<ShopListItemProps> = ({item}) =>{
    const { image, name, colors, description, rating, price, oldPrice } = item;
    return(
        
            <div className="third-container">
                <div className="pic-container">
                    <img src={image} alt={name}/>
                </div>
                <div className="pic-info">
                    <div className="p-1">
                        <h3 className="image-name">{name}</h3>
                                <div className="color-dots">
                                  {colors.map((color, id) => (
                                    <span 
                                      key={id} 
                                      className="dot" 
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                        
                                </div>
                    </div>
                    <div className="p-2">
                        <div className="pricing">
                          <span className="new-price">${price.toFixed(2)}</span>
                          <span className="old-price">${oldPrice.toFixed(2)}</span>
                        </div>
                        <div className="product-rating">
        
                            {Array(5)
                           .fill(null)
                           .map((_, i) => (
                            <span key={i} className={i < rating ? 'star-filled' : 'star-empty'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="p-3">
                        <p className="description">{description}</p>
                        </div>
                        <div className="icons">
                                  <FaShoppingCart/>
                                  <FaRegHeart/>
                                  <FaSearchPlus/>
                        
                                </div>
                    </div>
                </div>
            </div>
      

    )
}
const ShopList: React.FC = () =>{
    return(
        
         <div className="Big-container">
          <Layout>
            <div className="first-part">
                <h2 className="first-heading"> Shop List</h2>
                <div className="buttons">
                  <div><button className="nav-link">Home</button></div>
                  <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                  <ul><li><div><button className="nave-link">Shop List</button></div></li></ul> 

                </div>
            </div>
            <div className="second-part">
                <h3 className="second-heading">Ecommerce Acceories & Fashion item </h3>
                <p className="small-text">About 9,620 results (0.62 seconds)</p>

            </div>
          <div className="items-container">
           {Type.map((item) => (
            <ShopListItem key={item.id} item={item} />
           ))}
        </div>
        <div className="adt-container">
         <div className="adt-image">
            <img src="src/assets/images/image_015.png" alt="" />
          </div>
        </div>
        </Layout>
        </div>
        

    )
}
export default ShopList;