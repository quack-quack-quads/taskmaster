import CategoryCard from "./CategoryCard";
import "./CategoryCards.scss";

const CategoryCards = (props) => {
  return (
    <div className="cat-cards row">
      <div className="col-4">
        <CategoryCard
          text="Appliance Repair"
          sceneLink="https://draft.spline.design/3v67hYG2AGS8cOgb/scene.splinecode"
        />
      </div>
      <div className="col-4">
        <CategoryCard
          text="Painting & Decor"
          sceneLink="https://draft.spline.design/RsFsUQHZHjw3i6Vk/scene.splinecode"
        />
      </div>
      <div className="col-4">
        <CategoryCard
          text="Cleaning & Pest Control"
          sceneLink="https://draft.spline.design/nRu5AIDpsPCnd8Qi/scene.splinecode"
        />
      </div>
      <div className="col-4">
        <CategoryCard
          text="Electricians"
          sceneLink="https://draft.spline.design/QsTZz6oc0Ee8D4uF/scene.splinecode"
        />
      </div>
      <div className="col-4">
        <CategoryCard
          text="Plumbing"
          sceneLink="https://draft.spline.design/nx-LSAXa5XquehqC/scene.splinecode"
        />
      </div>
      <div className="col-4">
        <CategoryCard
          text="Custom"
          sceneLink="https://draft.spline.design/cxOuBMdSr6RXjzRE/scene.splinecode"
        />
      </div>
    </div>
  );
};

export default CategoryCards;
