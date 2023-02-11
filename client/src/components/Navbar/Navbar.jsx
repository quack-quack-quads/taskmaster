//styles
import "./Navbar.scss"
import { RiLoginCircleLine, RiLogoutCircleLine } from 'react-icons/ri'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'

//components
import ActionButton from "../Buttons/ActionButton"
import { Modal } from 'react-bootstrap'

import { ClientContext } from "../../context/clientContext"
import { BusinessContext } from "../../context/businessContext"

//tools
import React, { useState, useEffect, useContext } from 'react';
import LoginModal from "./LoginModal"
import ClientSignUp from "./ClientSignUp"

const Navbar = ({ flow }) => {
    const dismiss = () => {
        setShow(false);
    }

    const [show, setShow] = useState(false);
    const {uid, name, setUid} = (flow == "client") ? useContext(ClientContext) : useContext(BusinessContext);

    var signComp = <></>
    if (flow == "client") {
        signComp = <ClientSignUp
            dismiss={dismiss}
        />;
    }else if(flow == "business"){
        signComp = <ClientSignUp dismiss={dismiss}/>
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
           { (uid == null || uid == undefined) ?
            <ActionButton
                className="loginbtn"
                text={
                    <span>LOG IN &nbsp;<RiLogoutCircleLine size={25} /></span>}
                handler={() => {
                    setShow(true);
                }}
                width="100px"
            /> :
            <ActionButton
                text = {<span>LOG OUT&nbsp;<RiLoginCircleLine size={25}/></span>}
                handler = {
                    ()=>{
                        setUid(null);
                    }
                }
            />
        }
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