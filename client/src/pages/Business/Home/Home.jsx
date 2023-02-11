import "./Home.scss";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'

const Home = () => {
  return (
    <div className="Home">
      {/* <ChatWindow /> */}
      <Hero />
      <CategoryCards/>
      <Features/>
    </div>
  );
};

export default Home;
