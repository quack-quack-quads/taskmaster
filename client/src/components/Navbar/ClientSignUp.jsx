import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"

const SignUpModal = ({dismiss}) => {

    const signup = ()=>{

    }

    return <>
        <BsArrowLeftShort
            className="ml-3 arrowbutton"
            size={30}
            onClick={dismiss}
        />
        <div className="graphics d-flex justify-content-center">
            <img src={LoginImg} alt="" className="loginimage" 
                style={{"height" : "140px", "width" : "auto", "marginTop" : "0", "paddingTop" : "0"}}
            />
        </div>
        <div className="email">
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
                        onClick = {signup}
                    />}
                />
            </div>
        </div>
    </>
}

export default SignUpModal;