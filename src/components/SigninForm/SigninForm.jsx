import "./signinform.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const SigninForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setToken,
  API_URL,
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        Cookies.set("userToken", response.data.token, { expires: 10 });
        setToken(response.data.token);
        navigate("/");
      } else {
        alert("Le serveur ne répond pas...");
      }
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
      error.response
        ? alert("Une erreur est survenue : ", error.response.data.message)
        : alert("Une erreur est survenue...");
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
        <button className="submit-button">Se connecter</button>
      </form>
    </div>
  );
};

export default SigninForm;
