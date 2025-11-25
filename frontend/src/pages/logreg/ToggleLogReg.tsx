function ToggleLogReg() {
    return (
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel">
                    <h1>Welcome Friend!</h1>
                    <p>You ready to explore the book?</p>
                    <button className="hidden" id="login">Sign In</button>
                </div>
                <div className="toggle-panel">
                    <h1>Hello, Newcomer isn't?</h1>
                    <p>Don't fear just write them all down shall we?</p>
                    <button className="hidden" id="login">Sign Up</button>
                </div>
            </div>
        </div>
        
    );
}

export default ToggleLogReg;