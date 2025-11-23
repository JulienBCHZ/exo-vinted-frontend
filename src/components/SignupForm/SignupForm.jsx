import "./signupform.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// {
//     "_id": "69205d2f5d2b12d94cdfd4a7",
//     "email": "serge@julien.com",
//     "token": "XRMa_0K7QNBUAux-sHD6POJA0pryoOwcAvh8q5Ye5sF0CBTv3dTu8r7Oy6cw5ILR",
//     "account": {
//         "username": "julienbouchez"
//     }
// }

const SignupForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  newsletter,
  setNewsletter,
  errorMessage,
  setErrorMessage,
  token,
  setToken,
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 7 });
        setToken(response.data.token);
        navigate("/");
        setErrorMessage("");
      } else {
        setErrorMessage("Un problème est survenu...");
      }
      //   console.log(response.data);
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-vision">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
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
        <section className="form-checkbox">
          <div className="line-checkbox">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(event) => setNewsletter(event.target.checked)}
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

        <button className="submit-button">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignupForm;
