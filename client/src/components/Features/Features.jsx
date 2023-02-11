import "./Features.scss";
import Feature from "./Feature";
import RupeeIm from "../../assets/rupee.png";
import WorkersIm from "../../assets/workers.png";
import ClockIm from "../../assets/wall-clock.png";

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
          static_img={WorkersIm}
          img_pos="bot"
          title="Get access to a wide range of services"
        >
          Our app hosts a huge variety of workers specialised in various skills
          to provide a wide array of services
        </Feature>
        <Feature
          className="align-self-stretch col-12 col-lg-4"
          static_img={ClockIm}
          img_pos="top"
          title="Flexible timings"
        >
          Schedule a visit as per your convinience by interacting one-to-one
          with the workers to decide on a suitable time
        </Feature>
      </div>
    </div>
  );
};

export default Features;
