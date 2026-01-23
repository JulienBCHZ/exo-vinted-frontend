import Main from "../components/Main/Main";

const Home = ({ search, setSearch, API_URL }) => {
  return <Main search={search} API_URL={API_URL} />;
};

export default Home;
