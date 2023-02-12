import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import { useState, useContext, useEffect } from 'react'
import { loginapi } from '../../utilities/Auth'
import ReactDOM from "react-dom/client";

import { ClientContext } from "../../context/clientContext"
import { BusinessContext } from '../../context/businessContext'
import { Spinner } from 'react-bootstrap'

const LoginModal = ({ dismiss, redirect, flow }) => {
    const [waiting, setWaiting] = useState(false);
    const [emailAdd, setEmailAdd] = useState("");
    const [password, setPassword] = useState("");

    const { setDetails } = flow == "client" ? useContext(ClientContext) : useContext(BusinessContext);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const login = async () => {
        if (validateEmail(emailAdd) === null || password.length < 8) {
            alert("Please enter the details");
            return;
        }
        setWaiting(true);
        var data = await loginapi(emailAdd, password, flow);
        //console.log(data);
        if (data["uid"] === undefined) {
            alert("Login Failed!");
            dismiss();
            return
        }
        setDetails(data["uid"], data["name"], data['email'], data['phone'], data['starredWorkers'], data['jobList'], data['savedAddresses']);
        setWaiting(false);
        // //console.log("here",uid);
        dismiss();
    }

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
            <p className="invalid-text">{!validateEmail(emailAdd) ? `Enter a valid email address` : ""}</p>

            <input type="password" className="form-control shadow-none"
                placeholder="Password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />
            <p className="invalid-text">{password.length < 8 ? `Password cannot be less than 8 characters` : ""}</p>

            <div className="d-flex justify-content-center">
                <ActionButton
                    text={
                        waiting ?
                            <Spinner /> :
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