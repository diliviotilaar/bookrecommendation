import { FaGooglePlus } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CreateAccount() {
    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><FaGooglePlus /></a>
                        <a href="#" className="social"><FaFacebook /></a>

                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                    <span>Already have an account? <Link to="/">Login</Link></span>
                </form>    
            </div>
        </div>
    );
}

export default CreateAccount;