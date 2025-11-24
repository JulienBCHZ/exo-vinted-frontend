import "./publish.css";
import { useState } from "react";
import PublishForm from "../../components/PubllishForm/PublishForm";

const Publish = () => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
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
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </section>
      </div>
    </main>
  );
};

export default Publish;
