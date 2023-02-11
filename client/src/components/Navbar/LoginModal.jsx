import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import {  useState, useContext, useEffect } from 'react'
import { loginapi } from '../../utilities/Auth'
import ReactDOM from "react-dom/client";

import { ClientContext } from "../../context/clientContext"
import { BusinessContext } from '../../context/businessContext'
import { Spinner } from 'react-bootstrap'

const LoginModal = ({ dismiss, redirect, flow }) => {
    const [waiting, setWaiting] = useState(false);
    const [emailAdd, setEmailAdd] = useState("");
    const [password, setPassword] = useState("");

    const {uid,setDetails } = flow == "client" ? useContext(ClientContext) : useContext(BusinessContext);

    const login = async () => {
        setWaiting(true);
        var data = await loginapi(emailAdd, password, flow);
        setDetails(data["uid"], data["name"], data['email'], data['phone'], data['starredWorkers'], data['jobList'], data['savedAddresses']);
        setWaiting(false);
        // console.log("here",uid);
        dismiss();
    }

    useEffect(()=>{
        console.log("here",uid);
    },[uid])

    return <>
        <BsArrowLeftShort
            className="ml-3 arrowbutton"
            size={30}
            onClick={dismiss}
        />

        <div className="instead"
            onClick={redirect}
        >
            Sign up instead
        </div>

        <div className="graphics d-flex justify-content-center">
            <img src={LoginImg} alt="" className="loginimage" />
        </div>

        <div className="email">
            <div className="emailhead">
                Log in with your email
            </div>
            <input type="email" className="form-control shadow-none"
                placeholder="example@example.com"
                onChange={(event) => {
                    setEmailAdd(event.target.value);
                }}
            />

            <input type="password" className="form-control shadow-none"
                placeholder="Password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <div className="d-flex justify-content-center">
                <ActionButton
                    text={
                        waiting ?
                        <Spinner/>:
                        <BsArrowRightShort size={25}
                            onClick={login}
                        />
                    }
                />
            </div>
        </div>
    </>
}

export default LoginModal;