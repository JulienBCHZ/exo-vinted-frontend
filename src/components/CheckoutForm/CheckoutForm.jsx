import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

// title={title} totalPrice={totalPrice}
const CheckoutForm = ({ title, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  //   console.log("CHECK :", title, totalPrice);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [validPayment, setValidPayment] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    let response;
    try {
      // Create the PaymentIntent and obtain clientSecret
      response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title: title,
          amount: totalPrice,
          // Titre et montant de l'annonce
        }
      );
      console.log("response.data =>", response.data);
    } catch (error) {
      console.log(error.response);
    }

    const { client_secret: clientSecret } = response.data;

    const confirmResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });

    console.log("confirmResponse =>", confirmResponse);

    if (confirmResponse.error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(confirmResponse.error);
    } else {
      setValidPayment(true);
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return validPayment ? (
    <p>Paiement effectué</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button>Submit payment</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
