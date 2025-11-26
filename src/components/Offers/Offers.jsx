import "./offers.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Offers = ({ data }) => {
  const getUserToken = Cookies.get("userToken");
  // console.log("TOKEN:", getUserToken);
  const { count, offers } = data;
  //   console.log("TAB :", offers);
  // console.log("SEAR :", search);

  return (
    <section className="offers-previews container">
      {offers.map((offer) => {
        return (
          <div key={offer._id} className="offer">
            <Link style={{ textDecoration: "none", color: "lightgrey" }}>
              <div className="username">
                {offer.owner.account.avatar ? (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="user avatar"
                  />
                ) : (
                  <img alt="user avatar" />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
            </Link>
            <Link
              to={`/offer/${offer._id}`}
              style={{ textDecoration: "none", color: "lightgrey" }}
            >
              <div className="preview">
                <img alt="preview offer" src={offer.product_image.secure_url} />
                <div className="preview-details">
                  <p className="offer-price">
                    {offer.product_price.toFixed(2).split(".").join(",")} €
                  </p>
                  {offer.product_details.map((element, index) => {
                    if (element["TAILLE"]) {
                      return <p key={index}>{element["TAILLE"]}</p>;
                    }
                  })}
                  {offer.product_details.map((element, index) => {
                    if (element["MARQUE"]) {
                      return <p key={index}>{element["MARQUE"]}</p>;
                    }
                  })}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default Offers;
