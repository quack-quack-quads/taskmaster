import "./Features.scss";
import Feature from "./Feature";
import RupeeIm from "../../assets/rupee.png";

const Features = () => {
  return (
    <div className="features">
      <h1 className="features-heading text-center">
        Explore our amazing features
      </h1>
      <div className="d-flex flex-column flex-lg-row">
        <Feature
          className="align-self-stretch col-12 col-lg-4"
          static_img={RupeeIm}
          img_pos="top"
          title="Get fair prices"
        >
          Be sure of getting the fairest rates through our competetive bidding
          platform
        </Feature>
        <Feature
          className="align-self-stretch col-12 col-lg-4"
          static_img={RupeeIm}
          img_pos="bot"
          title="Get fair prices"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores,
          doloremque?
        </Feature>
        <Feature
          className="align-self-stretch col-12 col-lg-4"
          static_img={RupeeIm}
          img_pos="top"
          title="Get fair prices"
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum,
          eligendi!
        </Feature>
      </div>
    </div>
  );
};

export default Features;
