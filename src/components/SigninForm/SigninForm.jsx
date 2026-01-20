import "./signinform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SigninForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setToken,
  API_URL,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Votre Email et votre mot de passe sont requis");
    }
    setSubmitLoading(true);
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 10 });
        setToken(response.data.token);
        setSubmitLoading(false);
        location.state ? navigate(location.state.from) : navigate("/");
      } else {
        alert("Le serveur ne répond pas...");
        setSubmitLoading(false);
      }
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
      error.response
        ? alert(error.response.data.message)
        : alert("Une erreur est survenue...");
      setSubmitLoading(false);
    }
  };
  return (
    <div className="form-container-signin">
      <form onSubmit={handleSubmit} className="form-vision-signin">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {submitLoading || !email || !password ? (
          <div className="submit-button-signin-disabled">
            <p>Se connecter</p>
          </div>
        ) : (
          <button className="submit-button-signin">Se connecter</button>
        )}
      </form>
    </div>
  );
};

export default SigninForm;
