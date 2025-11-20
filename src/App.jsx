import "./App.css";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* PAGES */
import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

/* COMPOSANTS */
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
