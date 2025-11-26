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
      <div className="payment-container">
        <section className="order-resume">
          <p>Résumé de la commande</p>
          <div className="order-price">
            <span>Commande</span>
            <span>{`${price.toFixed(2)} €`}</span>
          </div>
          <div className="order-price">
            <span>Frais protection acheteur</span>
            <span>{`${insurancePrice.toFixed(2)} €`}</span>
          </div>
          <div className="order-price">
            <span>Frais de port</span>
            <span>{`${deliveryPrice.toFixed(2)} €`}</span>
          </div>
        </section>
        <section className="order-total">
          <div className="total-price">
            <span>Total</span>
            <span>{`${totalPrice.toFixed(2)} €`}</span>
          </div>
          <div className="payment-last-step">
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir
              <span> {title}</span>. Vous allez payer
              <span> {totalPrice.toFixed(2)} €</span> (frais de protection et
              frais de port inclus).
            </p>
          </div>
        </section>
        <section className="order-payment-method">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm title={title} totalPrice={totalPrice} />
          </Elements>
        </section>
      </div>
    </main>
  ) : (
    <Navigate to="/signin" state={{ from: "/payment" }} />
  );
};

export default Payment;
