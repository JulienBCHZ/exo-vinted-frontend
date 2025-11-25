import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

/* PAGES */
import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

/* COMPOSANTS */
import Header from "./components/Header/Header";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");
  // console.log("TOK", token);
  return (
    <>
      <Router>
        <Header setToken={setToken} search={search} setSearch={setSearch} />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup token={token} setToken={setToken} />}
          />
          <Route path="/signin" element={<Signin setToken={setToken} />} />
          <Route path="/publish" element={<Publish />} />
          <Route
            path="/payment"
            element={<Payment stripePromise={stripePromise} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
