import "./Hero.scss";
import SearchBar from "./SearchBar";
import ActionButton from "../Buttons/ActionButton";
import { useNavigate } from "react-router-dom";
const Hero = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('clicked')
    props.setShow(false);
  }
  return (
    <div className="hero d-flex flex-column align-items-stretch">
      <h1 className="title">
        Work<span className="title-accent">-Connect</span>
      </h1>
      <h3 className="subtitle">Connecting workers to clients.</h3>
      <SearchBar />
      <div className="row">
        <div className="col d-flex justify-content-center mt-3">
          <ActionButton text={"List a Job"} handler={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
