import "./catchall.css";

import { TfiFaceSad } from "react-icons/tfi";

const Catchall = () => {
  return (
    <main>
      <info className="catchall-container">
        <h1 className="catchall-message">Route doesn't exist...</h1>
        <TfiFaceSad className="catchall-icon" />
      </info>
    </main>
  );
};

export default Catchall;
