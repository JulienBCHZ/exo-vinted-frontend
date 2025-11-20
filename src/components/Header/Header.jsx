import "./header.css";
import logo from "../../assets/logo-vinted.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <section>
        <div className="header-top container">
          <Link to="/">
            <img src={logo} alt="Vinted logo" className="header-logo" />
          </Link>
          <div className="signup-signin">
            <Link to="/signup">
              <button className="signup">S'inscrire</button>
            </Link>
            <Link to="/signin">
              <button className="signin">Se connecter</button>
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
