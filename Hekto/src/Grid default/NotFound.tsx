import Layout from "../Components/layout";
import "./AboutUs.css"

const NotFound = () => {
    return(
        <Layout>

            <div className="not-found-page">

                  <div className="top">
                        <h2 className="header-top">404  Page Not Found</h2>
                        <div className="buttons">
                              <div><button className="nav-link">Home</button></div>
                              <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                              <ul><li><div><button className="nave-link">404 Not Found</button></div></li></ul>
                        </div>
                  </div>

                    <div className="bottom-section">
                           <div className="svg-image">

                           </div>

                               <div className="other-info">
                                      <h3 className="page-info1"> The page you requested was not found!</h3>

                                       <div className="button">
                                            <button className="back-btn">Back To Home</button>
                                       </div>
                               </div>
                                  <div className="adt-image">
                                       <img src="src/assets/images/image_015.png" alt="" />
                                   </div>
                                  
                    </div>
             
                  
            </div>
        </Layout>
    )
}
export default NotFound;