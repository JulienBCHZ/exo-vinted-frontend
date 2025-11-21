import "./signup.css";
import { useState } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";

const Signup = ({ token, setToken }) => {
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
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            token={token}
            setToken={setToken}
          />
        </div>
      </section>
    </main>
  );
};

export default Signup;
