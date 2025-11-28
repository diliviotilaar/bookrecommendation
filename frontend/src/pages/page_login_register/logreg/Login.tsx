import { FaGooglePlus } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Sign In</h1>
                    <div className="social-container">
                        <a href="#" className="social"><FaGooglePlus /></a>
                        <a href="#" className="social"><FaFacebook /></a>
                        
                    </div>
                    <span>or use your email for Sign In</span>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                    <span>You don't have an account? <Link to="/create-account">Create Account</Link></span>
                </form>    
            </div>
       </div>
    );
}

export default Login;