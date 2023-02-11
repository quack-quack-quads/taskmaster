//styles
import "./Navbar.scss"
import { RiLoginCircleLine } from 'react-icons/ri'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'

//components
import ActionButton from "../Buttons/ActionButton"
import { Modal, Button } from 'react-bootstrap'

//screens
//tools
import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [show, setShow] = useState(false)
    
    return <div className="Navbar container-fluid">
        <div className="row">
            <ActionButton
                className="loginbtn"
                text={
                    <span>LOG IN &nbsp;<RiLoginCircleLine size={25} /></span>}
                handler={() => {
                    setShow(true);
                }}
                width="100px"
            />
        </div>

        <Modal show={show}
            className="loginModal"
        >
            <Modal.Body>
                <BsArrowLeftShort
                    className="ml-3 arrowbutton"
                    size={30}
                    onClick={
                        () => {
                            setShow(false)
                        }
                    }
                />
                <div className="graphics d-flex justify-content-center">
                    <img src={LoginImg} alt="" className="loginimage" />
                </div>
                <div className="email">
                    <div className="emailhead">
                        Log in with your email
                    </div>
                    <input type="email" className="form-control shadow-none"
                        placeholder="example@example.com"
                    />
                    <div className="d-flex justify-content-center">
                        <ActionButton
                            text={<BsArrowRightShort size={25} />}
                        />
                    </div>
                </div>
                <div className="orrow d-flex justify-content-center mt-3 mb-3">
                    <b>OR USE</b>
                </div>
                <div className="socialsrow d-flex justify-content-center">
                    <div className="socialicon">
                        <BsGoogle size={30} />
                    </div>
                    <div className="socialicon">
                        <BsTwitter size={30} />
                    </div>
                    <div className="socialicon">
                        <BsGithub size={30} />
                    </div>
                    <div className="socialicon">
                        <BsDiscord size={30} />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
}

export default Navbar;