import "./header.css";
import newLogo from "../../assets/logo-vinted-2.svg";

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";

const Header = ({ setToken, search, setSearch }) => {
  const getUserToken = Cookies.get("userToken");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (location.pathname != "/") {
      navigate("/");
    }
  };

  return (
    <header>
      <section>
        <div className="header-top-container">
          <Link to="/">
            <img src={newLogo} alt="Vinted logo" className="header-logo" />
          </Link>
          <div className="search-line">
            <div className="search-logo">
              <IoSearch />
            </div>
            <input
              type="text"
              placeholder="Rechercher des articles"
              name="search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {getUserToken ? (
            <div className="logout">
              <button
                className="logout-button"
                onClick={() => {
                  Cookies.remove("userToken");
                  setToken(null);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="signup-signin">
              <button
                className="signup"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                S'inscrire
              </button>
              <button
                className="signin"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Se connecter
              </button>
            </div>
          )}
          {/* {getUserToken ? "/publish" : "/signin"} */}
          <Link to="/publish">
            <button className="selling-button">Vends tes articles</button>
          </Link>
        </div>
        <div className="header-bottom-container">
          <div className="search-line-bottom">
            <div className="search-logo">
              <IoSearch />
            </div>
            <input
              type="text"
              placeholder="Rechercher des articles"
              name="search"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
