    import { use, useState } from "react";
    import { FaGooglePlus, FaFacebook, FaTiktok } from "react-icons/fa";
    import { useNavigate } from "react-router-dom";
    import useHandlerRegistration from "../../hooks/handler/HandlerRegistration";
    import useHandlerLogin from "../../hooks/handler/HandlerLogin";

    function PageLoginRegis() {
      /* const variable */
      
      const {
        isActive,
        setIsActive,
        signupData,
        setSignupData,
        message: registerMessage,   // <-- alias
        handleRegister,
      } = useHandlerRegistration();

      const {
        loginData,
        setLoginData,
        message: loginMessage,      // <-- alias
        handlerLogin,
      } = useHandlerLogin();

      return (
        <div className={`container ${isActive ? "active" : ""}`} id="container">
          {/* Sign Up */}
          <div className="form-container sign-up-container" style={{ order: 2 }}>
            <form>
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icon-google"><FaGooglePlus /></a>
                <a href="#" className="icon-facebook"><FaFacebook /></a>
              </div>

              <span>or use your email for registration</span>
              <input
                type="text" 
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
              <input
              type="password"
              placeholder="Password" 
              value={signupData.password }
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              />
              <input
              type="number"
              placeholder="Age"
              value={signupData.age}
              onChange={(e) => setSignupData({ ...signupData, age: e.target.value })}
              />
              <input
              type="text"
              placeholder="Location"
              value={signupData.location}
              onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
              />
              <button 
                type="button"
                onClick={(e) => {
                  setIsActive(false);
                  // setSignupData({ username: "", password: "", age: "", location: "" });
                  handleRegister(e);
                  {registerMessage && <p>{registerMessage}</p>};
                }}
                >
                Sign Up
              </button>
              <span 
                className="mobile-toggle" 
                onClick={() => 
                  setIsActive(false)
                }
              >
                Already have an account? <b>Sign In</b>
              </span>
            </form>
          </div>
          {/* Sign In */}
          <div className="form-container sign-in-container" style={{ order: 1 }}>
            <form>
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icon-google"><FaGooglePlus /></a>
                <a href="#" className="icon-facebook"><FaFacebook /></a>
              </div>

              <span>or use your email for Sign In</span>
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              {loginMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {loginMessage}
                </p>
              )}
              {/* 🔥 END FIX */}

              <button
                type="button"
                onClick={(e) => handlerLogin(e)}
              >
                Sign In
              </button>
              <span 
                className="mobile-toggle" 
                onClick={() => setIsActive(true)}
              >
                Don't have an account? <b>Sign Up</b>
              </span>
            </form>
          </div>
          {/* Toggle Panels */}
          <div className="toggle-container">
            <div className="toggle">

              <div className="toggle-panel toggle-left">
                <h1>Are You Ready?</h1>
                <p>let's explore the books!</p>
                <button
                  className="hidden"
                  id="login"
                  type="button"
                  onClick={() => setIsActive(false)}
                >
                  I'm ready!
                </button>
              </div>

              <div className="toggle-panel toggle-right">
                <h1>Hi, Newcomer?</h1>
                <p>Don't fear just write them all down shall we?</p>
                <button
                  className="hidden"
                  id="register"
                  type="button"
                  onClick={() => setIsActive(true)}
                >
                  Let me join!
                </button>
              </div>

            </div>
          </div>

        </div>
      );
    }

    export default PageLoginRegis;
