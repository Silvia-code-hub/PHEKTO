import"./TrendBox.css"
const Box = () =>{
    return(
         <div className="trend-box">
                <div className="a-info">
                    <h3 className="a-subtitle">23% off in all products</h3>
                   <button className="shop-now-btn">Shop Now</button>
                   <img src="/src/assets/images/image_09.png" alt="" />
              </div>
                <div className="b-info">
                    <h3 className="b-subtitle">23% off in all products</h3>
                   <button className="view-collection-btn">View Collection</button>
                   <img src="/src/assets/images/image_06.png" alt="" />
               </div>
               <div className="c-info">
                 <div className="c-1">
                     <img src="/src/assets/images/image_010.png" alt="" />
                     <div className="inf">
                       <p className="c-name">Executive Seat chair </p>
                       <div className="c-price">${32.00.toFixed(2)}</div>
                     </div>
                     
                 </div>
                   <div className="c-2">
                     <img src="/src/assets/images/image_08.png" alt="" />
                      <div className="inf">
                       <p className="c-name">Executive Seat chair </p>
                       <div className="c-price">${32.00.toFixed(2)}</div>
                     </div>
                   </div>
                   <div className="c-3">
                     <img src="/src/assets/images/image_011.png" alt="" />
                      <div className="inf">
                       <p className="c-name">Executive Seat chair </p>
                       <div className="c-price">${32.00.toFixed(2)}</div>
                     </div>
                   </div>
               </div>
            </div>

    )
}
export default Box;