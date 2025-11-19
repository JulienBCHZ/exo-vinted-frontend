import { Link } from "react-router-dom";
import heroPicture from "../../assets/hero-picture.jpg";
import "./main.css";

const Main = () => {
  return (
    <main>
      <div>
        <section className="hero">
          <img src={heroPicture} alt="main-picture" className="main-picture" />
          <div className="overlay">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button>Commencer à vendre</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Main;
