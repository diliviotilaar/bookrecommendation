import Login from "./logreg/Login";
import CreateAccount from "./logreg/CreateAccount";
import ToggleLogReg from "./logreg/ToggleLogReg";
import { FaGooglePlus, FaFacebook } from 'react-icons/fa';
import "./styles/LogReg.css"

function PageLoginRegis() {
  return (
    <>
    <body>
        <div className="container" id="container" >
            <div className="form-container sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon-google"><FaGooglePlus /></a>
                        <a href="#" className="icon-facebook"><FaFacebook /></a>

                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>    
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon-google"><FaGooglePlus /></a>
                        <a href="#" className="icon-facebook"><FaFacebook /></a>
                        
                    </div>
                    <span>or use your email for Sign In</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>    
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Friend!</h1>
                        <p>You ready to explore the book?</p>
                        <button className="hidden" id="login">Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, You!</h1>
                        <p>Don't fear just write them all down shall we?</p>
                        <button className="hidden" id="login">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </>
  );
}
export default PageLoginRegis;