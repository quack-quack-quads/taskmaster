import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import { useState, useContext } from 'react'
import { signupapi } from '../../utilities/Auth'

import { ClientContext } from "../../context/clientContext"
import { BusinessContext } from '../../context/businessContext'
import { Spinner } from 'react-bootstrap'


const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const First = ({ handler, setEmail, setPassword, setConfirm, emailAdd, password, confirm }) => {
    return <div className="email">
        <div className="emailhead">
            Sign up with your email
        </div>
        <input type="email" className="form-control shadow-none"
            placeholder="example@example.com"
            onChange={() => {
                setEmail(event.target.value);
            }}
        />
        <p className="invalid-text">{!validateEmail(emailAdd) ? `Enter a valid email address` : ""}</p>
        <input type="password" className="form-control shadow-none"
            placeholder="Password"
            onChange={() => {
                setPassword(event.target.value);
            }}
        />
        <p className="invalid-text">{password.length < 8 ? `Password cannot be less than 8 characters` : ""}</p>
        <input type="password" className="form-control shadow-none"
            placeholder="Confirm password"
            onChange={() => {
                setConfirm(event.target.value);
            }}
        />
        <p className="invalid-text">{password != confirm ? `Passwords do not match!` : ""}</p>
        <div className="d-flex justify-content-center">
            <ActionButton
                text={<BsArrowRightShort size={25}
                    onClick={handler}
                />}
            />
        </div>
    </div>
}
const Second = ({ handler, setPhone, setName }) => {
    return <div className="email">
        <div className="emailhead">
            We will need some contact details
        </div>
        <input type="text" className="form-control shadow-none"
            placeholder="Name"
            onChange={() => {
                setName(event.target.value);
            }}
        />
        <input type="number" className="form-control shadow-none"
            placeholder="Contact Number"
            onChange={() => {
                setPhone(event.target.value);
            }}
        />
        <div className="d-flex justify-content-center">
            <ActionButton
                text={<BsArrowRightShort size={25}
                    onClick={handler}
                />}
            />
        </div>
    </div>
}

const ClientSignUp = ({ dismiss, flow }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [waiting, setWaiting] = useState(false);

    const { setDetails } = flow == "client" ? useContext(ClientContext) : useContext(BusinessContext);



    const signup = async () => {
        setWaiting(true);
        if (password != confirm) {
            setMessage("Passwords do not match");
        } else if (password.length < 6) {
            setMessage("Passwords should be atleast 6 characters long.");
        } else if (!email.includes("@")) {
            setMessage("Enter a valid email");
        } else {
            const payload = {
                "email": email,
                "password": password,
                "name": name,
                "phone": phone,
                "savedAddresses": [],
                "starredWorkers": []
            }
            var data = await signupapi(payload, flow).then((data) => data).catch(
                (e) => {
                    setMessage(e);
                    alert(e);
                    return null;
                }
            );
            //console.log(data);
            if (data["uid"] == null || data["uid"] == undefined) {
                alert("Failed to sign you up!")
                setWaiting(false);
                return;
            }
            setDetails(data["uid"], data["name"], data['email'], data['phone'], data['starredWorkers'], data['jobList'], data['savedAddresses']);
        }
        setWaiting(false);
        dismiss();
    }
    const firstPage = <First
        handler={() => {
            setPage("second")
            //console.log("no way")
        }}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirm={setConfirm}
        emailAdd={email}
        password={password}
        confirm={confirm}
    />
    const secondPage = <Second
        handler={signup}
        setPhone={setPhone}
        setName={setName}
    />

    const [page, setPage] = useState("first")

    const pageMap = {
        "first": firstPage,
        "second": secondPage
    }


    return <>
        <BsArrowLeftShort
            className="ml-3 arrowbutton"
            size={30}
            onClick={
                page == "first" ?
                    dismiss :
                    () => {
                        setPage("first");
                    }
            }
        />
        <div className="graphics d-flex justify-content-center">
            <img src={LoginImg} alt="" className="loginimage"
                style={{ "height": "140px", "width": "auto", "marginTop": "0", "paddingTop": "0", }}
            />
        </div>
        {pageMap[page]}
    </>
}

export default ClientSignUp;