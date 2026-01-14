import "./signup.css";
import { useState } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import { Link } from "react-router-dom";

const Signup = ({ token, setToken, API_URL }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <main>
      <section className="signup-container">
        <div className="title">
          <h1>S'inscrire</h1>
        </div>
        <div>
          <SignupForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            newsletter={newsletter}
            setNewsletter={setNewsletter}
            setToken={setToken}
            API_URL={API_URL}
          />
        </div>
        <div className="to-signin">
          <Link to="/signin">
            <button className="existing-acount">
              Déjà un compte ? Connecte-toi !
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Signup;
