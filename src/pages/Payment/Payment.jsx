import "./payment.css";

import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm.jsx";

const Payment = ({ stripePromise }) => {
  const getUserToken = Cookies.get("userToken");
  const offerDetails = useLocation();
  //   console.log(offerDetails.state);
  const { title, price } = offerDetails.state;
  const deliveryPrice = 1;
  const insurancePrice = 0.4;
  const totalPrice = price + insurancePrice + deliveryPrice;

  // STRIPE //
  const options = {
    mode: "payment",
    amount: totalPrice * 100, // montant indiqué en centimes !
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return getUserToken ? (
    <main className="main-payment">
      <section className="payment-container">
        <div>
          <p>Résumé de la commande</p>
          <div>
            <span>Commande</span>
            <span>{`${price} €`}</span>
          </div>
          <div>
            <span>Frais protection acheteur</span>
            <span>{`${insurancePrice} €`}</span>
          </div>
          <div>
            <p>Frais de port</p>
            <span>Frais de port</span>
            <span>{`${deliveryPrice} €`}</span>
          </div>
        </div>
        <div>
          <div>
            <span>Total</span>
            <span>{`${totalPrice} €`}</span>
          </div>
          <div className="payment-resume">
            <p>Il ne vous reste plus qu'une étape pour vous offrir </p>
            <span>{title}</span>
            <p>. Vous allez payer </p>
            <span>{totalPrice}</span>
            <p> (frais de protection et frais de port inclus)</p>
          </div>
        </div>
        <div>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={title} totalPrice={totalPrice} />
          </Elements>
        </div>
      </section>
    </main>
  ) : (
    <Navigate to="/signin" state={{ from: "/payment" }} />
  );
};

export default Payment;
