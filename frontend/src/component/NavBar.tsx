import "./styles/navbar.css";

function NavBar(){
    return(
        <nav className="container-navbar">
            <div className="contain-navbar">
                <h1>BookRec</h1>
                <div className="nav-items">
                <a className="ai-rec-page" href="">Ai Recommendation</a>
                <div className="search-container">
                    <input className="form-control me-2" type="search" placeholder="What book in mind?" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </div>
                <a className="navbar-brand" href="#">
                <span className="username-profile"
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    window.location.href = "/login";  // redirect
                    }}
                >{localStorage.getItem("username")}</span>
                </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;