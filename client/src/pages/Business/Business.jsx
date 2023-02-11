import { BusinessProvider } from "../../context/businessContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import BusinessHome from './BusinessHome/BusinessHome'

const Business = () => {
  return (
    <BusinessProvider>
      <Navbar flow = "business"/>
      <BusinessHome />
      <ChatWindow flow = "business"/>
    </BusinessProvider>
  )
}

export default Business