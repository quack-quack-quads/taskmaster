import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import { useState } from 'react'

import {loginapi} from '../../utilities/Auth'

const LoginModal = ({dismiss, redirect, flow}) => {

    const [waiting, setWaiting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async ()=>{
        var data = await loginapi(email, password, flow);
        
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
                onChange = {(event)=>{
                    setEmail(event.target.value);
                }}
            />
            <input type="password" className="form-control shadow-none"
                placeholder="Password"
                onChange = {(event)=>{
                    setPassword(event.target.value);
                }}
            />
            <div className="d-flex justify-content-center">
                <ActionButton
                    text={<BsArrowRightShort size={25}
                        onClick = {login}
                    />}
                />
            </div>
        </div>
    </>
}

export default LoginModal;