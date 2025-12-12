import "./styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/account/books?search=${encodeURIComponent(search)}`);
    setSearch(""); // clear input after search
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="container-navbar">
      <div className="contain-navbar">
        <a className="web-title" href="/account/books">BookRec</a>
        
        <div className="nav-items">
          <a className="ai-rec-page" href="/ai-recommendation">AI Recommendation</a>

          <div className="search-container">
            <input
              className="form-control me-2"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search books..."
            />

            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <span
            className="username-profile"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
          >
            {localStorage.getItem("username")}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
