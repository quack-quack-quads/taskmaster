import "./JobListing.scss"
import Card from "./Card"
import plumbing from "../assets/plumbing.png"
import electrician from "../assets/electrician.png"
import janitor from "../assets/janitor.png"
import maid from "../assets/maid.png"
import security from "../assets/security.png"
import more from "../assets/more.png"
import home from "../assets/home.png"
import { useState, useEffect, useLayoutEffect, useRef, useContext } from 'react'
import { BsGoogle, BsTwitter, BsGithub, BsDiscord, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { Modal, Button } from 'react-bootstrap'
import { gsap } from "gsap"
import LoginImg from '../assets/address.gif'
import ActionButton from "./Buttons/ActionButton"
import { ToastContainer, toast } from 'react-toastify';
import { ClientContext } from "../context/clientContext"
import { postJob, getJob } from "../utilities/Jobs"
import { useNavigate } from "react-router-dom";

export default function JobListing({ show, setShow }) {

    //Fetched Data
    const [addresses, setAddresses] = useState([]);

    const { uid, name, setUid } = useContext(ClientContext);

    const [name1, setName] = useState("Plumber");
    const [name2, setName2] = useState("Electrician")
    const [name3, setName3] = useState("Janitor")
    const [name4, setName4] = useState("Maid")
    const [name5, setName5] = useState("Security")

    const [para, setPara] = useState("Install, repair, and maintain pipes, valves, fittings, drainage systems.")

    const [curr, setCurr] = useState(0);
    const [curr1, setCurr1] = useState(0);
    const [change, setChange] = useState(-1);
    const [prev, setPrev] = useState(false);
    // Form data
    const [pincode, setpincode] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [bid, setBid] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [addressName, setAddressName] = useState("");
    const [loaded, setLoadedAddress] = useState(false);
    const [highlighter, setHighlighter] = useState(-1);
    const [title, setTitle] = useState("");
    const [show1, setShow1] = useState(false);

    // category selection states
    const [cat, setCat] = useState(null);

    //address selection state
    const [addressHighlight, setAddressHighlight] = useState(-1);
    // Animation reference
    const f1 = useRef();


    const handleNameChange = (event) => {
        setclientName(event.target.value);
    }
    const handleBidChange = (event) => {
        setBid(event.target.value);
    }
    const handleNext = (event) => {
        if (curr === 0) {
            if (cat === null) {
                alert("Please Select a Category")
                // toast.error("Please Select a Cateogory!", {
                //     position: toast.POSITION.TOP_CENTER
                // });
                return;
            }
        }
        else if (curr === 1) {
            if (title.length === 0) {
                alert("Title cannot be empty")
                return;
            }
        }
        else if (curr === 2) {
            if (description.length < 50) {
                alert("Please Enter at least 50 characters")
                // toast.error("Please Select a Cateogory!", {
                //     position: toast.POSITION.TOP_CENTER
                // });
                return;
            }
        }
        else if (curr === 4) {
            if (addressHighlight === -1) {
                alert("Please Slect Your address")
                return;
            }
        }
        setPrev(false)
        setCurr1(curr1 + 1);
    }
    const handlePrev = (event) => {
        setPrev(true)
        setCurr1(curr1 - 1);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleCategorySelection = (type) => {
        setCategory(type)
        if (type === 'Plumbing') {
            setCat(0)
        }
        else if (type === 'Electrician') {
            setCat(1)
        }
        else if (type === "Janitor") {
            setCat(2)
        }
        else if (type === "Maid") {
            setCat(3)
        }
        else if (type === "Security") {
            setCat(4)
        }
        else {
            setCat(5)
        }
    }
    const navigate = useNavigate();
    const handleDone = () => {
        var obj = {
            uid: uid,
            job: {
                from: uid,
                title: title,
                address: addresses[addressHighlight],
                status: "bidOn",
                startingBid: bid,
                description: description,
                category: category,
                to: "",
                settled: "",

            }

        }
        postJob(obj);
        //console.log(obj)

        setShow(false);
        //console.log(show);
    }
    const handleAddrressClick = (type, count) => {
        // //console.log()
        if (type === "Other") {
            setShow1(!show1);
        }
        else {
            setAddressHighlight(count);
            setHighlighter(count);
            setAddress(addresses[count]);
        }
    }
    const handleModalDetectClick = (arg) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLatitude(pos.coords.latitude);
                setLongitude(pos.coords.longitude);
                setAddress("");
                setpincode("");
                // var obj = {
                //     address: address,
                //     latitude: latitude,
                //     longitude: longitude,
                //     pincode: pincode,
                // }
                // var add = addresses
                // add.push(obj)
                // setAddresses(add)
                setLoadedAddress(true);
            })
        }
        else {
            alert("Navigation is not Available!");
            setShow1(false);
        }
    }
    const handleModalAddressClick = (event) => {
        setLatitude("");
        setLongitude("");

        setLoadedAddress(true)
    }
    const handleModalChange = async (event) => {
        setpincode(event.target.value);
    }
    const handleModalAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleAddressName = (event) => {
        setAddressName(event.target.value)
    }
    const handleAddressSubmission = () => {
        var obj = {
            name: addressName,
            addressline: address,
            latitude: latitude,
            longitude: longitude,
            pincode: pincode,
        }
        var add = addresses
        add.push(obj)
        setAddresses(add)
        setShow1(false)
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);

    }
    const [initialRender, setInitialRender] = useState(true)
    const [initLoad, setInitLoad] = useState(true);
    let tl = gsap.timeline();

    useLayoutEffect(() => {
        if (change !== -1) {



            if (prev) {
                tl.fromTo(".form-container", {
                    opacity: 0,
                    x: -500,
                },
                    {
                        opacity: 100,
                        x: 0,
                    }, "<"
                );
                tl.to(".form-container", { opacity: 100, x: 0 });
            }
            else {
                tl.fromTo(".form-container", {
                    opacity: 0,
                    x: 500,
                },
                    {
                        opacity: 100,
                        x: 0,
                    }
                );
                tl.to(".form-container", { opacity: 100, x: 0 });
            }



        }
    }, [change])


    useLayoutEffect(() => {
        if (initialRender) {
            setInitialRender(false)
        }
        else {
            let ctx = gsap.context(() => {



                if (prev) {
                    tl.to(".form-container", {
                        duration: 0.5,
                        // opacity: 0,
                        x: 550,
                        ease: "power1.out",
                        onComplete: () => {
                            setCurr(curr1);
                            setChange(curr);

                        }
                    });
                    // tl.to(".form-container", {
                    //     duration: 0.9,
                    //     opacity: 0,
                    //     x: -300,
                    //     ease: "power1.in",

                    // });
                }
                else {
                    tl.to(".form-container", {
                        duration: 0.5,
                        x: -500,
                        opacity: 0,
                        ease: "power1.out",
                        onComplete: () => {
                            setCurr(curr1);
                            setChange(curr);

                        }
                    });
                    // tl.to(".form-container", {
                    //     duration: 0.9,
                    //     opacity: 0,
                    //     x: 300,
                    //     ease: "power1.in",

                    // });
                }




                // gsap.from(f2.current, { x: 500 })






            }, f1)
            return () => ctx.revert();
        }

    }, [curr1])

    const renderItems = () => {
        let count = -1
        return (
            addresses.map((items) => {
                count = count + 1;

                return (

                    <div className={`col-${window.innerWidth <= 350 ? '12' : '6'}  col-sm-4 col1 d-flex justify-content-center `} onClick={() => { handleAddrressClick(items, count) }}>
                        {//console.log(addressHighlight === highlighter)

                        }
                        <Card name={items.name} image={home} para={para} width={'7rem'} height={'10rem'} mtTitle={'2'} class={`transparent`} highlight={addressHighlight === highlighter ? "highlight" : ""} />
                    </div>
                )

            })
        )
    }

    const renderForm = () => {
        switch (curr) {

            case 4:
                return (
                    <div className="form1">
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-5">
                                <h1 className="txt">Enter Address</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            {
                                renderItems()
                            }
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'}  col-sm-4 col1 d-flex justify-content-center `} onClick={() => { handleAddrressClick('Other') }}>
                                <Card name={"Add "} image={home} para={para} width={'7rem'} height={'10rem'} mtTitle={'0'} class={"transparent"} />
                            </div>

                        </div>
                        <div className="row mt-7 gx-0 mb-5 ">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handlePrev}>
                                    Prev
                                </button>
                                <button className="btn btn-info btn-lg next-button next" onClick={handleNext}>
                                    Next
                                </button>
                            </div>

                        </div>

                    </div>
                )
                break;

            case 3:
                return (
                    <div className="form2" >
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">Enter the Starting Bid</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center mt-5">
                                <input className="form-control name-inp" placeholder="Starting Bid" onChange={handleBidChange} value={bid}>
                                </input>
                            </div>

                            <p className="invalid-text">{/\D/.test(bid) ? `Enter only numbers.` : ""}</p>
                        </div>
                        <div className="row mt-7 mb-5">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handlePrev} >
                                    Prev
                                </button>
                                <button className="btn btn-info btn-lg next-button next" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )

            case 1:
                return (
                    <div className="form3" >
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">Enter Job Title</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center mt-5">
                                <input className="form-control name-inp" placeholder="Description" onChange={handleTitleChange}>
                                </input>

                            </div>
                            <p className="invalid-text">{title.length == 0 ? `Job Title cannot be empty.` : ""}</p>
                        </div>
                        <div className="row mt-7 mb-5">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handlePrev} >
                                    Prev
                                </button>
                                <button className="btn btn-info btn-lg next-button next" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )

            case 2:
                return (
                    <div className="form3" >
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">Enter Job Description</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center mt-5">
                                <input className="form-control name-inp" placeholder="Description" onChange={handleDescriptionChange}>
                                </input>

                            </div>
                            <p className="invalid-text">{description.length < 50 ? `${50 - description.length} more caraacter required.` : ""}</p>
                        </div>
                        <div className="row mt-7 mb-5">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handlePrev} >
                                    Prev
                                </button>
                                <button className="btn btn-info btn-lg next-button next" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )

            case 0:
                return (
                    <div className="form4" >
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-4">
                                <h1 className="txt">Select Category</h1>
                            </div>


                        </div>
                        <div className="row mt-4 gx-0 ml-sm-5 row1 d-flex justify-content-center">
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'}   col-sm-4 col-md-4  col1 d-flex justify-content-center  `} onClick={() => { handleCategorySelection('Plumbing') }}>
                                <Card name={name1} image={plumbing} para={para} width={'7rem'} height={'10rem'} mtTitle={'2'} highlight={cat === 0 ? "highlight" : null} />
                            </div>
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'}  mt-${window.innerWidth <= 350 ? '3' : '0'} col-sm-4 col-md-4 col1 d-flex justify-content-center  `} onClick={() => { handleCategorySelection('Electrician') }}>
                                <Card name={name2} image={electrician} para={para} width={'7rem'} height={'10rem'} mtTitle={'2'} highlight={cat === 1 ? "highlight" : null} />
                            </div>
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'} col-sm-4  col-md-4 col1 mt-3 mt-sm-0 d-flex justify-content-center `} onClick={() => { handleCategorySelection('Janitor') }}>
                                <Card name={name3} image={janitor} para={para} width={'6rem'} height={'10rem'} mtTitle={'2'} mr={'5'} highlight={cat === 2 ? "highlight" : null} />
                            </div>

                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'} col-sm-4  col1 mt-3 col-md-4 mt-sm-3 d-flex justify-content-center`} onClick={() => { handleCategorySelection('Maid') }}>
                                <Card name={name4} image={maid} para={para} width={'7rem'} height={'10rem'} mtTitle={'4'} mtImage={'3'} highlight={cat === 3 ? "highlight" : null} />
                            </div>
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'} col-sm-4 col1 mt-3 ml-sm-5 mt-sm-3  col-md-4 d-flex justify-content-center `} onClick={() => { handleCategorySelection('Security') }}>
                                <Card name={name5} image={security} para={para} width={'7rem'} height={'10rem'} highlight={cat === 4 ? "highlight" : null} />
                            </div>
                            <div className={`col-${window.innerWidth <= 350 ? '12' : '6'} col-sm-4 col1 mt-3 mt-sm-3  col-md-4 d-flex justify-content-center `} onClick={() => { handleCategorySelection('More') }}>
                                <Card name={"Custom"} image={more} para={para} width={'6rem'} mtTitle={'3'} height={'10rem'} highlight={cat === 5 ? "highlight" : null} />
                            </div>


                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handlePrev} disabled>
                                    Prev
                                </button>
                                <button className="btn btn-info btn-lg next-button next" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )

            case 5:
                return (
                    <div className="form6" >
                        <div className="row d-flex justify-content-center roww mt-6">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">You're All Set!</h1>
                            </div>
                            <div className="row mt-7 mb-5">
                                <div className="col d-flex justify-content-center">
                                    <button className="btn btn-info btn-lg next-button" onClick={handleDone}>
                                        Done
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                )

            default:
                return (
                    null
                )
                break;
        }
    }

    return (

        <div className="body " ref={f1}>

            <Modal show={show1}
                className="loginModal"
            >
                <Modal.Body>
                    <BsArrowLeftShort
                        className="ml-3 arrowbutton"
                        size={30}
                        onClick={
                            () => {
                                setShow1(false)
                            }
                        }
                    />
                    <div className="graphics d-flex justify-content-center">
                        <img src={LoginImg} alt="" className="loginimage" />
                    </div>
                    {!loaded ?
                        <div className="email">

                            <div className="emailhead">
                                Enter Your Address
                            </div>

                            <input type="text" className="form-control shadow-none"
                                placeholder="Address" onChange={handleModalAddressChange}
                            />

                            <div className="emailhead">
                                Enter Your Pincode
                            </div>

                            <input type="number" className="form-control shadow-none"
                                placeholder="Pin Code" onChange={handleModalChange}
                            />
                            <div className="row">
                                <div className="col-3"></div>
                                <div className="d-flex justify-content-center col-3">
                                    <span className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Detect Your current locatin">
                                        <ActionButton
                                            text={"Detect"}
                                            handler={handleModalDetectClick}
                                        />
                                    </span>

                                </div>
                                <div className="d-flex justify-content-center col-3" >
                                    <ActionButton
                                        text={"Submit"}
                                        handler={handleModalAddressClick}
                                    />
                                </div>
                            </div>

                        </div>
                        :
                        <div className="email">
                            <div className="emailhead">
                                Enter the Address Name:
                            </div>

                            <input type="text" className="form-control shadow-none"
                                placeholder="Address" onChange={handleAddressName}
                            />
                            <div className="row">
                                <div className="d-flex justify-content-center col" >
                                    <ActionButton
                                        text={"Submit"}
                                        handler={handleAddressSubmission}
                                    />
                                </div>
                            </div>

                        </div>
                    }


                </Modal.Body>
            </Modal>

            <ToastContainer />
            <div className="container-fluid job-form ">

                <div className="row">
                    <div className="col-xs-12 col-md-12 form-col">
                        <div className="container form-container">
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}