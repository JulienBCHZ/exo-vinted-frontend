import "./publishform.css";

import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { FaPlus } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

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
  API_URL,
}) => {
  const navigate = useNavigate();
  const getUserToken = Cookies.get("userToken");
  //   console.log("TOKEN :", getUserToken);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !price) {
      alert("Le titre et le prix de l'annonce sont nécessaire !");
    } else {
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
          `${API_URL}/offer/publish`,
          formData,
          {
            headers: {
              authorization: `Bearer ${getUserToken}`,
            },
          },
        );
        if (response.data._id) {
          navigate(`/offer/${response.data._id}`);
        } else {
          alert("Le serveur ne répond pas...");
        }
        console.log("AXIOS RETURN :", response.data);
      } catch (error) {
        console.log(error);
        error.response
          ? alert(error.response.data.message)
          : alert("Une erreur est survenue...");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="publish-form-section">
      <section className="publish-form-top">
        <div className="picture-input-design">
          <label htmlFor="picture" className="file-label">
            <FaPlus />
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
          <label htmlFor="title">Titre</label>
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
          <label htmlFor="description">Décris ton article</label>
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
          <label htmlFor="brand">Marque</label>
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
          <label htmlFor="title">Taille</label>
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
          <label htmlFor="color">Couleur</label>
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
          <label htmlFor="condition">Etat</label>
          <input
            type="text"
            placeholder="Etat"
            name="condition"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </div>
        <div className="city-line">
          <label htmlFor="city">Lieu</label>
          <input
            type="text"
            placeholder="Lieu"
            name="city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>
      </section>
      <section className="publish-form-bottom">
        <div className="price-line">
          <label htmlFor="price">Prix</label>
          <input
            type="text"
            placeholder="Prix"
            name="price"
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
