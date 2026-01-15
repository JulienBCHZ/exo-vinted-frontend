import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import heroPicture from "../../assets/hero-picture.jpg";
import "./main.css";

import Offers from "../Offers/Offers";

const Main = ({ search, API_URL }) => {
  // console.log("SEAR :", search);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/v2/offers?title=${search}`
        );
        if (response.data) {
          // console.log("RES :", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          console.log("NO RES : ", response);
          alert("Le serveur ne répond pas...");
        }
      } catch (error) {
        console.log("OFFERS ERROR : ", error);
        error.response
          ? alert(error.response.data.message)
          : alert("Une erreur est survenue");
      }
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
      {isLoading ? <div>Loading... Please wait !</div> : <Offers data={data} />}
    </main>
  );
};

export default Main;
