import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import { useState } from 'react'

const First = ({ handler }) => {
    return <div className="email">
        <div className="emailhead">
            Sign up with your email
        </div>
        <input type="email" className="form-control shadow-none"
            placeholder="example@example.com"
        />
        <input type="password" className="form-control shadow-none"
            placeholder="Password"
        />
        <input type="password" className="form-control shadow-none"
            placeholder="Confirm password"
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
const Second = ({ handler }) => {
    return <div className="email">
        <div className="emailhead">
            We will need some contact details
        </div>
        <input type="text" className="form-control shadow-none"
            placeholder="Name"
        />
        <input type="number" className="form-control shadow-none"
            placeholder="Contact Number"
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

const ClientSignUp = ({ dismiss }) => {
    const signup = () => {

    }

    const firstPage = <First handler={() => {
        setPage("second")
        console.log("no way")
    }} />
    const secondPage = <Second handler={signup} />

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
                ()=>{
                    setPage("first");
                }
            }
        />
        <div className="graphics d-flex justify-content-center">
            <img src={LoginImg} alt="" className="loginimage"
                style={{ "height": "140px", "width": "auto", "marginTop": "0", "paddingTop": "0" }}
            />
        </div>
        {pageMap[page]}
    </>
}

export default ClientSignUp;