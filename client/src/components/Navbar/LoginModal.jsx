import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"

const LoginModal = ({dismiss}) => {
    return <>
        <BsArrowLeftShort
            className="ml-3 arrowbutton"
            size={30}
            onClick={dismiss}
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
            <input type="password" className="form-control shadow-none"
                placeholder="Password"
            />
            <div className="d-flex justify-content-center">
                <ActionButton
                    text={<BsArrowRightShort size={25} />}
                />
            </div>
        </div>
    </>
}

export default LoginModal;