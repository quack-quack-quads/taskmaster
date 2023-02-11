import { BusinessProvider } from "../../context/businessContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Home from './Home/Home'

const Business = () => {
  return (
    <BusinessProvider>
      <Navbar flow = "business"/>
      <Home />
      <ChatWindow flow = "business"/>
    </BusinessProvider>
  )
}

export default Business