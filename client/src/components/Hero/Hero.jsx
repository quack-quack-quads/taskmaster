import "./Hero.scss";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="hero d-flex flex-column align-items-stretch">
      <h1 className="title">
        Work<span className="title-accent">-Connect</span>
      </h1>
      <h3 className="subtitle">Connecting workers to clients.</h3>
      <SearchBar />
    </div>
  );
};

export default Hero;
