import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import heroPicture from "../../assets/hero-picture.jpg";
import "./main.css";

import Offers from "../Offers/Offers";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log("RES :", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main>
      <div>
        <section className="hero">
          <img src={heroPicture} alt="main-picture" className="main-picture" />
          <div className="overlay">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </section>
      </div>
      <section className="offers-previews">
        <Link to="/offer">
          <button className="button">Go to offers !!!</button>
        </Link>
      </section>
    </main>
  );
};

export default Main;
