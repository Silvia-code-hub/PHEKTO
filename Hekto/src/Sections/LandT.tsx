import "./LandT.css"
const features = () =>{
    return(
      <div className="features-container">
        <div className="features-image ">
        <img src="/src/assets/images/sofa2.png" alt="" />
      </div>
      <div className="features-info">
        <h2 className="subtitle">Unique Features Of leatest &
Trending Poducts</h2>
<p className="l1">All frames constructed with hardwood solids and laminates</p>
<p className="l2">Reinforced with double wood dowels, glue, screw - nails corner 
blocks and machine nails</p>
<p className="l3">Arms, backs and seats are structurally reinforced</p>
<button className="Add-to-Cart-btn">Add To Cart</button>
<p className="sofa-name">B&B Italian Sofa </p>
<div className="features-price">${32.00.toFixed(2)}</div>


      </div>

       </div>
    )
}
export default features;