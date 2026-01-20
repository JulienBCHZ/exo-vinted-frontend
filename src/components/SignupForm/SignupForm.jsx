import "./signupform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const SignupForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  newsletter,
  setNewsletter,
  setToken,
  API_URL,
}) => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
      alert("A username, an email and a password are required");
    } else if (usernameError) {
      alert(usernameError);
    } else if (emailError) {
      alert(emailError);
    } else if (passwordError) {
      alert(passwordError);
    } else {
      setSubmitLoading(true);
      try {
        const response = await axios.post(`${API_URL}/user/signup`, {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
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
    }
  };

  const handleChangeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (value.length > 0 && value.length < 4) {
      setUsernameError("username trop court");
    } else {
      setUsernameError("");
    }
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    if (value.length > 0 && value.length < 6) {
      setEmailError("format email invalide");
    } else if (!value.includes("@") && value.length > 0) {
      setEmailError("format email invalide");
    } else {
      setEmailError("");
    }
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (value.length < 6 && value.length > 0) {
      setPasswordError("mot de passe trop court");
    } else {
      setPasswordError("");
    }
  };

  const handleCheckNewsletter = (event) => {
    const value = event.target.checked;
    setNewsletter(value);
  };

  return (
    <div className="form-container-signup">
      <form onSubmit={handleSubmit} className="form-vision-signup">
        <div className="input-fields">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChangeUsername}
          />
          {usernameError ? (
            <div className="field-error-text">
              <p>{usernameError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <div className="input-fields">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
          />
          {emailError ? (
            <div className="field-error-text">
              <p>{emailError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <div className="input-fields">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
          {passwordError ? (
            <div className="field-error-text">
              <p>{passwordError}</p>
            </div>
          ) : (
            <div className="field-error-text"></div>
          )}
        </div>
        <section className="form-checkbox">
          <div className="line-checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={handleCheckNewsletter}
              className="checkbox"
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <div className="newsletter-terms">
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
        </section>
        {submitLoading ||
        usernameError ||
        emailError ||
        passwordError ||
        !username ||
        !email ||
        !password ? (
          <div className="submit-button-signup-disabled">
            <p>S'inscrire</p>
          </div>
        ) : (
          <button className="submit-button-signup">S'inscrire</button>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
