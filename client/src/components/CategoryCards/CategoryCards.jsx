import CategoryCard from "./CategoryCard";
import applianceRepairImg from "../../assets/car-repair.png";
import paintImg from "../../assets/varnish.png";
import cleaningImg from "../../assets/vaccum-cleaner.png";
import maidImg from "../../assets/cleaning-lady.png";
import securityImg from "../../assets/policeman.png";
import electricianImg from "../../assets/electrician (1).png";
import plumbingImg from "../../assets/plumbing (1).png";
import toolsImg from "../../assets/tool-box.png";
import "./CategoryCards.scss";

const CategoryCards = (props) => {
  const handleCategoryClick = (category) => {
    props.setRCategory(category);
    props.setShow(true);
  };
  return (
    <div className="cat-cards row">
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Plumbers"
          img={plumbingImg}
          alt="plumbers"
          type="Plumbing"
        />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Electricians"
          img={electricianImg}
          alt="electricians"
          type="Electrician"
        />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Janitors"
          img={cleaningImg}
          alt="janitors"
          type="Janitor"
        />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Maids"
          img={maidImg}
          alt="maids"
          type="Maid"
        />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Security"
          img={securityImg}
          alt="security"
          type="Security"
        />
      </div>
      <div className="line d-block d-sm-none"></div>
      <div className="col-sm-4 col-12">
        <CategoryCard
          // handleCategoryClick={handleCategoryClick}
          text="Custom"
          img={toolsImg}
          alt="custom"
          type="Custom"
        />
      </div>
    </div>
  );
};

export default CategoryCards;
