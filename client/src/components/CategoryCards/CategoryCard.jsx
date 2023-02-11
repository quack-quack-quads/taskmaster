import "./CategoryCard.scss";
import Spline from "@splinetool/react-spline";

const CategoryCard = (props) => {
  return (
    <div className="cat-card d-flex flex-column align-items-stretch justify-content-between">
      <Spline scene={props.sceneLink} />
      <p className="cat-text">{props.text}</p>
    </div>
  );
};

export default CategoryCard;
