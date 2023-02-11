//styles
import "./App.scss";
import { BsChatDotsFill } from "react-icons/bs"

//tools
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//screens
import {Business, Client, Home} from "./pages/index"

//components
import Navbar from "./components/Navbar/Navbar";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import ActionButton from "./components/Buttons/ActionButton";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/business" element={<Business />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
      <ChatWindow/>
    </div>
  );
}

export default App;
