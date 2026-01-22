import "./offer.css";

// COMPONENTS
import OfferPresentation from "../../components/Offer-presentation/OfferPresentation";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Offer = ({ API_URL }) => {
  const getUserToken = Cookies.get("userToken");

  const params = useParams();
  const { id } = params;
  // console.log(id);

  return getUserToken ? (
    <main className="main-offer">
      <OfferPresentation API_URL={API_URL} />
    </main>
  ) : (
    <Navigate to="/signin" state={{ from: `/offer/${id}` }} />
  );
};

export default Offer;
