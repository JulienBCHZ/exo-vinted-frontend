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
    <section className="offer-prsentation-page container">
      {isLoading ? (
        <p>Loading... Please wait !</p>
      ) : (
        <>
          <img
            src={offerData.product_image.secure_url}
            className="product-image"
          />
          <section className="product-full-details"></section>
        </>
      )}
    </section>
  );
};

export default OfferPresentation;
