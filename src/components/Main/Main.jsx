import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import heroPicture from "../../assets/hero-picture.jpg";
import "./main.css";

import Offers from "../Offers/Offers";
// search={search} setSearch={setSearch}
const Main = ({ search, setSearch }) => {
  // console.log("SEAR :", search);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
      );
      // console.log("RES :", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <main>
      <div className="hero-picture">
        <img src={heroPicture} alt="main-picture" className="main-picture" />
        <section className="hero-container">
          <div className="overlay">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </section>
      </div>
      {isLoading ? (
        <div>Loading... Please wait !</div>
      ) : (
        <Offers data={data} search={search} />
      )}
    </main>
  );
};

export default Main;
