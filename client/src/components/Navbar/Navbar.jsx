//styles
import "./Navbar.scss"
import { RiLoginCircleLine } from 'react-icons/ri'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'

//components
import ActionButton from "../Buttons/ActionButton"
import { Modal } from 'react-bootstrap'

//tools
import React, { useState, useEffect } from 'react';
import LoginModal from "./LoginModal"
import ClientSignUp from "./ClientSignUp"

const Navbar = ({ flow }) => {
    const dismiss = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false)

    var signComp = <></>
    if (flow == "client") {
        signComp = <ClientSignUp
            dismiss={dismiss}
        />;
    }

    const loginComp = <LoginModal
        dismiss={dismiss}
        redirect={() => {
            setMode(signComp);
        }}
        flow={flow}
    />

    useEffect(() => {
        if (!show) {
            setMode(loginComp);
        }
    }, [show]);

    const [mode, setMode] = useState(loginComp)



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
                {mode}
            </Modal.Body>
        </Modal>
    </div>
}

export default Navbar;