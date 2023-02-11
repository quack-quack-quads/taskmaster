//styles
import "./App.scss";
import { BsChatDotsFill } from "react-icons/bs"

//tools
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//screens
import Home from "./pages/Home/Home";

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
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <ChatWindow/>
    </div>
  );
}

export default App;
