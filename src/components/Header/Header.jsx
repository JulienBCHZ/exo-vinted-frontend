import "./header.css";
import logo from "../../assets/logo-vinted.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header>
      <section>
        <div className="header-top container">
          <Link to="/">
            <img src={logo} alt="Vinted logo" className="header-logo" />
          </Link>

          {token ? (
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
              {/* <Link to="/signup">
              <button className="signup">S'inscrire</button>
            </Link>
            <Link to="/signin">
              <button className="signin">Se connecter</button>
            </Link> */}
            </div>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
