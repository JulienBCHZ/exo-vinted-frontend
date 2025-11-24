import "./publishform.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

//   picture={picture}
// setPicture={setPicture}
// title={title}
// setTitle={setTitle}
// description={description}
// setDescription={setDescription}
// price={price}
// setPrice={setPrice}
// condition={condition}
// setCondition={setCondition}
// city={city}
// setCity={setCity}
// brand={brand}
// setBrand={setBrand}
// size={size}
// setSize={setSize}
// color={color}
// setColor={setColor}
//  errorMessage={errorMessage}
//     setErrorMessage={setErrorMessage}

const PublishForm = ({
  picture,
  setPicture,
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  condition,
  setCondition,
  city,
  setCity,
  brand,
  setBrand,
  size,
  setSize,
  color,
  setColor,
  errorMessage,
  setErrorMessage,
}) => {
  const navigate = useNavigate();
  const getUserToken = Cookies.get("userToken");
  //   console.log("TOKEN :", getUserToken);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", Number(price));
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", Number(size));
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${getUserToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
        setErrorMessage("");
      }
      console.log("AXIOS RETURN :", response.data);
    } catch (error) {
      error.response
        ? setErrorMessage(error.response.data.message)
        : console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="publish-form-section">
      <section className="publish-form-top">
        <div className="picture-input-design">
          <label htmlFor="picture" className="file-label">
            Ajouter une photo
          </label>
          <input
            type="file"
            id="picture"
            onChange={(event) => {
              setPicture(event.target.files[0]);
            }}
          />
        </div>
      </section>
      <section className="publish-form-middle-top">
        <div className="title-line">
          <h2>Titre</h2>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="description-line">
          <h2>Décris ton article</h2>
          <input
            type="text"
            placeholder="Description"
            name="descrition"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
      </section>
      <section className="publish-middle-bottom">
        <div className="brand-line">
          <h2>Marque</h2>
          <input
            type="text"
            placeholder="Marque"
            name="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
        </div>
        <div className="size-line">
          <h2>Taille</h2>
          <input
            type="text"
            placeholder="Taille"
            name="Taille"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </div>
        <div className="color-line">
          <h2>Couleur</h2>
          <input
            type="text"
            placeholder="Couleur"
            name="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </div>
        <div className="condition-line">
          <h2>Etat</h2>
          <input
            type="text"
            placeholder="Etat"
            name="Condition"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </div>
        <div className="city-line">
          <h2>Lieu</h2>
          <input
            type="text"
            placeholder="Lieu"
            name="City"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
      </section>
      <section className="publish-form-bottom">
        <div className="price-line">
          <h2>Prix</h2>
          <input
            type="text"
            placeholder="Prix"
            name="Price"
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
        </div>
        <div className="exchange-checkbox">
          <input
            type="checkbox"
            // checked={newsletter}
            // onChange={handleCheckNewsletter}
            className="checkbox"
          />
          <span>Je suis intéressé(e) par les échanges</span>
        </div>
      </section>
      <div className="create-offer">
        <button className="create-offer-button">Envoyer</button>
      </div>
    </form>
  );
};

export default PublishForm;
