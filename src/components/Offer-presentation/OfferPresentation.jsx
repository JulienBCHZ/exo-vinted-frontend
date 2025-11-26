import "./offerpresentation.css";

import { useParams, Link } from "react-router-dom";
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
    <section className="offer-container">
      {isLoading ? (
        <p>Loading... Please wait !</p>
      ) : (
        <>
          {offerData.product_image ? (
            <img
              src={offerData.product_image.secure_url}
              alt="product image"
              className="product-image"
            />
          ) : (
            <img
              // src={offerData.product_image.secure_url}
              alt="product image"
              className="product-image"
            />
          )}
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
                        <div className="product-details" key={index}>
                          <p className="detail-type">MARQUE</p>
                          <p className="detail-name">{element["MARQUE"]}</p>
                        </div>
                      )}
                      {element["TAILLE"] && (
                        <div className="product-details" key={index}>
                          <p className="detail-type">TAILLE</p>
                          <p className="detail-name">{element["TAILLE"]}</p>
                        </div>
                      )}
                      {element["ÉTAT"] && (
                        <div className="product-details" key={index}>
                          <p className="detail-type">ÉTAT</p>
                          <p className="detail-name">{element["ÉTAT"]}</p>
                        </div>
                      )}
                      {element["COULEUR"] && (
                        <div className="product-details" key={index}>
                          <p className="detail-type">COULEUR</p>
                          <p className="detail-name">{element["COULEUR"]}</p>
                        </div>
                      )}
                      {element["EMPLACEMENT"] && (
                        <div className="product-details" key={index}>
                          <p className="detail-type">EMPLACEMENT</p>
                          <p className="detail-name">
                            {element["EMPLACEMENT"]}
                          </p>
                        </div>
                      )}
                      {element["MODE DE PAIEMENT"] && (
                        <div className="product-details" key={index}>
                          <p className="detail-type">MODE DE PAIEMENT</p>
                          <p className="detail-name">
                            {element["MODE DE PAIEMENT"]}
                          </p>
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
                {offerData.owner.account.avatar ? (
                  <img
                    src={offerData.owner.account.avatar.secure_url}
                    alt="avatar"
                    className="user-avatar"
                  />
                ) : (
                  <img alt="avatar" className="user-avatar" />
                )}
                <span>{offerData.owner.account.username}</span>
              </div>
            </div>
            <Link
              to="/payment"
              state={{
                title: offerData.product_name,
                price: offerData.product_price,
              }}
            >
              <button className="buy">ACHETER</button>
            </Link>
            {/* <button className="buy">ACHETER</button> */}
          </section>
        </>
      )}
    </section>
  );
};

export default OfferPresentation;
