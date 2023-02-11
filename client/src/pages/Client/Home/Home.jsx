import "./Home.scss";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
// import Profile from "../profile"

const Home = (props) => {
  console.log(props.show)
  return (
    <div className="Home">
      <Hero setShow={props.setShow} />
      <CategoryCards />
      <Features />

    </div>
  );
};

export default Home;
