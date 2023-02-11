import './Navbar.scss'
import LoginImg from '../../assets/hands.gif'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import ActionButton from "../Buttons/ActionButton"
import { useState, useContext } from 'react'
import { signupapi } from '../../utilities/Auth'

import { ClientContext } from "../../context/clientContext"
import { BusinessContext } from '../../context/businessContext'
import { Spinner } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {storage} from "../../../firebase-config"
import uuid from 'react-uuid';

const First = ({ handler, setEmail, setPassword, setConfirm }) => {
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
        <input type="password" className="form-control shadow-none"
            placeholder="Password"
            onChange={() => {
                setPassword(event.target.value);
            }}
        />
        <input type="password" className="form-control shadow-none"
            placeholder="Confirm password"
            onChange={() => {
                setConfirm(event.target.value);
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

const Third = ({ handler, setGovt, setOccupation, occupation}) => {
    const [val, setVal] = useState("Occupation")
    
    return <div className="email">
        <div className="emailhead">
            We need the following for verification
        </div>

        <input type="text" className="form-control shadow-none"
            placeholder="Government ID"
            onChange={() => {
                setGovt(event.target.value);
            }}
        />

        <Dropdown>
            <Dropdown.Toggle variant="white" id="dropdown-basic">
                {occupation}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={()=>{setOccupation("Electrician")}}
                >Electrician</Dropdown.Item>
                <Dropdown.Item
                    onClick={()=>{setOccupation("Plumber")}}
                >Plumber</Dropdown.Item>
                <Dropdown.Item
                    onClick={()=>{setOccupation("Maid")}}
                >Maid</Dropdown.Item>
                <Dropdown.Item
                    onClick={()=>{setOccupation("Janitor")}}
                >Janitor</Dropdown.Item>
                <Dropdown.Item
                    onClick={()=>{setOccupation("Security")}}
                >Security</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex justify-content-center">
            <ActionButton
                text={<BsArrowRightShort size={25}
                    onClick={handler}
                />}
            />
        </div>
    </div>
}

const Fourth = ({handler, setImage}) => {
    return <div className="email">
        <div className="emailhead">
            Upload a soft copy of your govt. identification
        </div>
        <input type="file" className="form-control shadow-none"
            placeholder="Upload here"
            id="inputFile"
            accept="image/*"
            required = {true}
            onChange={(event) => {
                setImage(event.target.files[0]);
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


const BusinessSignUp = ({ dismiss, flow }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [govt, setGovt] = useState("");
    const [occupation, setOccupation] = useState("Occupation");
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState("");

    const [message, setMessage] = useState("");
    const [waiting, setWaiting] = useState(false);

    const { setDetails } = flow == "client" ? useContext(ClientContext) : useContext(BusinessContext);

  const uploadFile = async (uid) => {
    console.log("uploading file")
    const storageRef = ref(storage, `${uuid()}`);
    const snapshot = await uploadBytes(storageRef, image);
    console.log("uploaded file")
    // return the url of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref);
    setImageURL(downloadURL);
    return downloadURL;
  };

    const signup = async () => {
        setWaiting(true);
        if (password != confirm) {
            setMessage("Passwords do not match");
        } else if (password.length < 6) {
            setMessage("Passwords should be atleast 6 characters long.");
        } else if (!email.includes("@")) {
            setMessage("Enter a valid email");
        } else {
            const downloadurl = await uploadFile();
            const payload = {
                "email": email,
                "password": password,
                "name": name,
                "phone": phone,
                "govt" : govt,
                "occupation": occupation,
                "image" : downloadurl
            }
            var data = await signupapi(payload, flow).then((data) => data).catch(
                (e) => {
                    setMessage(e);
                    return null;
                }   
            );
            console.log(data);
            if (data["uid"] == null || data["uid"] == undefined) {
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
        }}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirm={setConfirm}
    />
    const secondPage = <Second
        handler={() => {
            setPage("third")
        }}
        setPhone={setPhone}
        setName={setName}
    />

    const thirdPage = <Third
        handler={
            () => {
                setPage("fourth")
            }
        }
        setGovt={setGovt}
        setOccupation={setOccupation}
        occupation = {occupation}
    />

    const fourthPage = <Fourth
        handler={signup}
        setImage = {setImage}
    />

    const [page, setPage] = useState("first")

    const pageMap = {
        "first": firstPage,
        "second": secondPage,
        "third": thirdPage,
        "fourth": fourthPage
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

export default BusinessSignUp;