import CategoryCard from "./CategoryCard";
import applianceRepairImg from "../../assets/car-repair.png";
import paintImg from "../../assets/varnish.png";
import cleaningImg from "../../assets/vaccum-cleaner.png";
import electricianImg from "../../assets/electrician (1).png";
import plumbingImg from "../../assets/plumbing (1).png";
import toolsImg from "../../assets/tool-box.png";
import "./CategoryCards.scss";

const CategoryCards = (props) => {
  return (
    <div className="cat-cards row">
      <div className="col-sm-4 col-12">
        <CategoryCard text="Appliance Repair" img={applianceRepairImg} alt="" />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard text="Painting & Decor" img={paintImg} alt="" />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard text="Cleaning & Pest Control" img={cleaningImg} alt="" />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard text="Electricians" img={electricianImg} alt="" />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard text="Plumbing" img={plumbingImg} alt="" />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard text="Custom" img={toolsImg} alt="" />
      </div>
    </div>
  );
};

export default CategoryCards;
