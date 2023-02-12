import { ClientProvider } from "../../context/clientContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import ClientHome from './ClientHome/ClientHome'


const Client = () => {
  return (
    <ClientProvider>
      <div className="wrapper">
      <Navbar flow="client" />
      <ClientHome flow="client"/>
      <ChatWindow flow="client" />
      </div>
    </ClientProvider>
  )
}

export default Client