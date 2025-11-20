import "./offer.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import OfferPresentation from "../../components/Offer-presentation/OfferPresentation";

const Offer = () => {
  return (
    <main>
      <OfferPresentation />
    </main>
  );
};

export default Offer;
