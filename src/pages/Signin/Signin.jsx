import "./signin.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import SigninForm from "../../components/SigninForm/SigninForm";

const Signin = ({ setToken, API_URL }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            setToken={setToken}
            API_URL={API_URL}
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
