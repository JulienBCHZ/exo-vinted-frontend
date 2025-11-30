import "./signinform.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const SigninForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
  setToken,
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 10 });
        setToken(response.data.token);
        navigate("/");
        setErrorMessage("");
      } else {
        setErrorMessage("Vérifiez votre email ou votre mot de passe !");
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
        {errorMessage && <p className="signin-error-message">{errorMessage}</p>}
        <button className="submit-button">Se connecter</button>
      </form>
    </div>
  );
};

export default SigninForm;
