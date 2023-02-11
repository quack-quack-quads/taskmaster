import "./BusinessHome.scss";
import ChatWindow from "../../../components/ChatWindow/ChatWindow";
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
import { BusinessContext } from "../../../context/businessContext"
import { useContext } from "react";

//business home
const BusinessHome = () => {
  const {uid, name, email, phone, starredWorkers, jobList, savedAddresses} = useContext(BusinessContext);
  
  if(uid == null) return (
    <div className="BusinessHome">
      <Hero />
      <CategoryCards/>
      <Features/>
    </div>
  );
  return <div className="Dash">
    We are here bro.
  </div>
};

export default BusinessHome;
