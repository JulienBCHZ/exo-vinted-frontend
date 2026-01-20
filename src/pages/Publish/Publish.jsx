import "./publish.css";
import PublishForm from "../../components/PubllishForm/PublishForm";

import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Publish = ({ API_URL }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const getUserToken = Cookies.get("userToken");

  return getUserToken ? (
    <main className="main-publish">
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <section>
          <PublishForm
            picture={picture}
            setPicture={setPicture}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            condition={condition}
            setCondition={setCondition}
            city={city}
            setCity={setCity}
            brand={brand}
            setBrand={setBrand}
            size={size}
            setSize={setSize}
            color={color}
            setColor={setColor}
            API_URL={API_URL}
          />
        </section>
      </div>
    </main>
  ) : (
    <Navigate to="/signin" state={{ from: "/publish" }} />
  );
};

export default Publish;
