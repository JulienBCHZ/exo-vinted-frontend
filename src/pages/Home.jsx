import { Link } from "react-router-dom";
import Main from "../components/Main/Main";
// search={search} setSearch={setSearch}
const Home = ({ search, setSearch }) => {
  return <Main search={search} setSearch={setSearch} />;
};

export default Home;
