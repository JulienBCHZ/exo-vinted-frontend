import "./payment.css";

import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const Payment = () => {
  const getUserToken = Cookies.get("userToken");
  const offerDetails = useLocation();
  //   console.log(offerDetails.state);
  const { title, price } = offerDetails.state;

  return getUserToken ? (
    <main className="main-payment">
      <section className="payment-container"></section>
    </main>
  ) : (
    <Navigate to="/signin" state={{ from: "/payment" }} />
  );
};

export default Payment;
