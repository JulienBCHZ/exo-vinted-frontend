import "./offerpresentation.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const OfferPresentation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offerData, setOfferData] = useState(null);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      console.log("DATA OFFER", response.data);
      setOfferData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <section className="offer-presentation-page container">
      {isLoading ? (
        <p>Loading... Please wait !</p>
      ) : (
        <>
          <img
            src={offerData.product_image.secure_url}
            className="product-image"
          />
          <section className="product-presentation">
            <div className="details-top">
              <p className="product-price">
                {offerData.product_price.toFixed(2).split(".").join(",")} €
              </p>
              <div>
                {offerData.product_details.map((element, index) => {
                  return (
                    <>
                      {element["MARQUE"] && (
                        <div className="product-details">
                          <p>MARQUE</p>
                          <p>{element["MARQUE"]}</p>
                        </div>
                      )}
                      {element["TAILLE"] && (
                        <div className="product-details">
                          <p>TAILLE</p>
                          <p>{element["TAILLE"]}</p>
                        </div>
                      )}
                      {element["ÉTAT"] && (
                        <div className="product-details">
                          <p>ÉTAT</p>
                          <p>{element["ÉTAT"]}</p>
                        </div>
                      )}
                      {element["COULEUR"] && (
                        <div className="product-details">
                          <p>COULEUR</p>
                          <p>{element["COULEUR"]}</p>
                        </div>
                      )}
                      {element["EMPLACEMENT"] && (
                        <div className="product-details">
                          <p>EMPLACEMENT</p>
                          <p>{element["EMPLACEMENT"]}</p>
                        </div>
                      )}
                      {element["MODE DE PAIEMENT"] && (
                        <div className="product-details">
                          <p>MODE DE PAIEMENT</p>
                          <p>{element["MODE DE PAIEMENT"]}</p>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
            <div className="details-bottom">
              <h3>{offerData.product_name}</h3>
              <p>{offerData.product_description}</p>
              <div className="user">
                <img
                  src={offerData.owner.account.avatar.secure_url}
                  className="user-avatar"
                />
                <span>{offerData.owner.account.username}</span>
              </div>
            </div>
            <button className="buy">ACHETER</button>
          </section>
        </>
      )}
    </section>
  );
};

export default OfferPresentation;
