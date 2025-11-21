import "./signin.css";
import { useState } from "react";
import SigninForm from "../../components/SigninForm/SigninForm";
import { Link } from "react-router-dom";

const Signin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <main>
      <section className="signin-container">
        <div className="title">
          <h1>Se connecter</h1>
        </div>
        <div>
          <SigninForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setToken={setToken}
          />
        </div>
        <div className="to-signup">
          <Link to="/signup">
            <button className="no-acount">
              Pas encore de compte ? Inscris-toi !
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signin;
