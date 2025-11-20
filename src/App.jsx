import "./App.css";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* PAGES */
import Home from "./pages/Home";
import Offer from "./pages/Offer/Offer";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
