import "./offers.css";
import { Link } from "react-router-dom";
const Offers = ({ data }) => {
  //   console.log(data);
  const { count, offers } = data;
  //   console.log("TAB :", offers);
  return (
    <section className="offers-previews container">
      {offers.map((offer) => {
        return (
          <div key={offer._id} className="offer">
            <Link style={{ textDecoration: "none", color: "lightgrey" }}>
              <div className="username">
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt="user avatar"
                />
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
                  {offer.product_details.map((element) => {
                    return (
                      <>{element["TAILLE"] && <p>{element["TAILLE"]}</p>}</>
                    );
                  })}
                  {offer.product_details.map((element) => {
                    return (
                      <>{element["MARQUE"] && <p>{element["MARQUE"]}</p>}</>
                    );
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
