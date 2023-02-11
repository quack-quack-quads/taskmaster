import { ClientProvider } from "../../context/clientContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

const Client = () => {
  return (
    <ClientProvider>
      <Navbar flow = "client"/>
        <div>Hi</div>
      <ChatWindow/>
    </ClientProvider>
  )
}

export default Client