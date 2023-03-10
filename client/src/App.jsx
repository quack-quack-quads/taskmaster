import "bootstrap/dist/css/bootstrap.min.css";
//styles
import "./App.scss";
import { BsChatDotsFill } from "react-icons/bs"

//tools
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//screens
import { Business, Client, Admin } from "./pages/index";
import { ToastContainer } from "react-toastify";
//components
// import JobListing from "./components/JobListing";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {/* <Route path="/client/joblisting" element={<JobListing />} /> */}
          <Route path="/client" element={<Client />} />
          <Route path="/business" element={<Business />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Client />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
