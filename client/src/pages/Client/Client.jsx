import { ClientProvider } from "../../context/clientContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Home from './Home/Home'
import JobListing from "../../components/JobListing";
import { useState } from "react";

const Client = () => {
  const [show, setShow] = useState(true);
  console.log(show);
  return (
    <ClientProvider>
      <Navbar flow="client" />
        <Home/>
      {/* <JobListing/> */}
      <ChatWindow flow="client" />
    </ClientProvider>
  )
}

export default Client