import { ClientProvider } from "../../context/clientContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import BusinessHome from './BusinessHome/BusinessHome'

const Business = () => {
  return (
    <ClientProvider>
      <Navbar flow = "business"/>
      <BusinessHome />
      <ChatWindow flow = "business"/>
    </ClientProvider>
  )
}

export default Business