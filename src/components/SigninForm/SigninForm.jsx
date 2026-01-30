import "./signinform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";

const SigninForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setToken,
  API_URL,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      error.message === "Request failed with status code 401"
        ? alert("Vérifiez votre email et votre mot de passe")
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
          required={true}
        />
        <div className="signin-password-input-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required={true}
          />
          <span
            className="signin-password-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOffOutline /> : <FaRegEye />}
          </span>
        </div>

        {submitLoading ? (
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
