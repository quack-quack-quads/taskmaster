import { BusinessProvider } from "../../context/businessContext"
import Navbar from "../../components/Navbar/Navbar";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

const Business = () => {
  return (
    <BusinessProvider>
      <Navbar flow = "client"/>
      <div>Business</div>
      <ChatWindow />
    </BusinessProvider>
  )
}

export default Business