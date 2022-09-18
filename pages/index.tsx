import { getLayout } from "./components/layout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <div className="home-box">home</div>;
};

Home.getLayout = getLayout;
export default Home;
