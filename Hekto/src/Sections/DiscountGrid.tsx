import Feature from "./Discount"
import "./DiscountGrid.css"

const DiscGrid: React.FC = () => {
    return(
     <div className="disc-grid-container">
      <p className="disc-subtitle">Discount Item</p> 
      <div className="disc-button">
        <div><button className="disc-nav-link">Wood Chair</button></div>
      <div><button className="disc-nav-link">Plastic Chair</button></div>
      <div><button className="disc-nav-link">Sofa Collection</button></div>
      
      </div>
      <Feature/>
      </div>
    )
}
export default DiscGrid;