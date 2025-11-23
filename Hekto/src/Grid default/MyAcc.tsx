import Layout from "../Components/Layout";
import "./MyAcc.css"

const MyAcc: React.FC = () => {
    return(
       
            <div className="whole-page">
                 <Layout>
                <div className="up-side">
                    <h2 className="first-heading"> My Account</h2>
                    <div className="buttons">
                      <div><button className="nav-link">Home</button></div>
                        <ul><li><div><button className="nave-link">Pages</button></div></li></ul>
                        <ul><li><div><button className="nave-link">My Account</button></div></li></ul> 

                    </div>
                </div>
                <div className="down-side">
                    <div className="down-content">
                        <h3 className="login">Login</h3>
                    <p className="login-heading">Please login using account detail below.</p>
                    <div className="input-box">
                        <div className="email">
                           <form action="input-box">
                            <input type="text box" name="email" id="email" placeholder=" Email Address" />
                            </form>
                        </div>
                        <div className="password">
                            
                            <input type="password" name="password" id="password" placeholder=" Password" />
                        </div>
                        

                    </div>
                    <p className="forgot-password">Forgot your password?</p>
                        <div className="button">
                            <button className="signin-btn">Sign In</button>

                        </div>
                    <p>Don't have an Account?Create account</p> 

                </div>

                    </div>
                    
            <div className="adt-image">
               <img src="src/assets/images/image_015.png" alt="" />
          </div>
          </Layout>
            </div>
        

    );
};
export default MyAcc;