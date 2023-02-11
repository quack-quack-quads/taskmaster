import "./ClientHome.scss";
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
import { useContext, useEffect } from "react";
import { ClientContext } from "../../../context/ClientContext"

//client home
const ClientHome = () => {
  const {uid} = useContext(ClientContext);

  useEffect(()=>{
    console.log("there",uid)  
  },[])
  
  if(uid == null) return (
    <div className="ClientHome">
      <Hero />
      <CategoryCards/>
      <Features/>
    </div>
  );
  return <div className="Dash">
    We are here bro.
  </div>
};

export default ClientHome;
