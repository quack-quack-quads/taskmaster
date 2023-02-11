import "bootstrap/dist/css/bootstrap.min.css";
//styles
import "./App.scss";

//tools
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//screens
import { Business, Client, Home } from "./pages/index";

//components
import Navbar from "./components/Navbar/Navbar";

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
    </div>
  );
}

export default App;
