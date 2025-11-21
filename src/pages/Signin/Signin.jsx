import "./signin.css";
import { useState } from "react";
import SigninForm from "../../components/SigninForm/SigninForm";

const Signin = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <main>
      <section className="signin-container">
        <div className="title">
          <h1>S'inscrire</h1>
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
      </section>
    </main>
  );
};

export default Signin;
