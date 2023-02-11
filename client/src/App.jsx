//styles
import "./App.scss";

//tools
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//screens
import Home from "./pages/Home/Home";

//components
import Navbar from "./components/Navbar/Navbar";


import Card from './components/Card'
import JobListing from './components/JobListing'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
