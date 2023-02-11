import { ClientProvider } from "../../context/clientContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Home from './Home/Home'


const Client = () => {
  return (
    <ClientProvider>
      <Navbar flow = "client"/>
        <Home/>
      <ChatWindow flow ="client"/>
    </ClientProvider>
  )
}

export default Client