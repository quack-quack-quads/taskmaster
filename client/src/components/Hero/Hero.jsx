import "./Hero.scss";
import SearchBar from "./SearchBar";
import ActionButton from "../Buttons/ActionButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import JobListing from "../../components/JobListing";
import { toast, ToastContainer } from 'react-toastify';
const Hero = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => {
    
    setShow(!show)
  }
  return (
    <div className="hero d-flex flex-column align-items-stretch">
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        className="mod"
        centered
        size="lg"
      >

        <Modal.Body >

          <JobListing setShow={setShow} />


        </Modal.Body>

      </Modal>
      <h1 className="title">
        Work<span className="title-accent">-Connect</span>
      </h1>
      <h3 className="subtitle">Connecting workers to clients.</h3>
      {/* <SearchBar />
      <div className="row">
        <div className="col d-flex justify-content-center mt-3">
          <ActionButton text={"List a Job"} handler={handleClick} />
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
