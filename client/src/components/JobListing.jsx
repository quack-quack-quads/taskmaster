import "./JobListing.scss"
import Card from "./Card"
import plumbing from "../assets/plumbing.png"
import electrician from "../assets/electrician.png"
import janitor from "../assets/janitor.png"
import maid from "../assets/maid.png"
import security from "../assets/security.png"
import more from "../assets/more.png"
import { useState } from 'react'

export default function JobListing() {

    const [name1, setName] = useState("Plumber");
    const [name2, setName2] = useState("Electrician")
    const [name3, setName3] = useState("Janitor")
    const [name4,setName4] = useState("Maid")
    const [name5, setName5] = useState("Security")

    const [para, setPara] = useState("Install, repair, and maintain pipes, valves, fittings, drainage systems.")

    const [curr, setCurr] = useState(0);

    // Form data
    const [clientname, setclientName] = useState("");
    const [bid, setBid] = useState(0);
    const [description, setDescription] = useState("");

    const handleNameChange = (event) => {
        setclientName(event.target.value);
    }
    const handleBidChange = (event) => {
        setBid(event.target.value);
    }
    const handleNext = (event) => {
        setCurr(curr + 1);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const renderForm = () => {
        switch (curr) {
            case 0:
                console.log(curr)
                return (
                    <div className="form1">
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">Enter Your Name</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center mt-5">
                                <input className="form-control name-inp" placeholder="Your Name" onChange={handleNameChange}>
                                </input>
                            </div>
                        </div>
                        <div className="row mt-7">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )
                break;

            case 1:
                console.log(curr);
                return (
                    <div className="form2">
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-7">
                                <h1 className="txt">Enter the Starting Bid</h1>
                            </div>

                        </div>
                        <div className="row mt-5">
                            <div className="col d-flex justify-content-center mt-5">
                                <input className="form-control name-inp" placeholder="Starting Bid" onChange={handleBidChange}>
                                </input>
                            </div>
                        </div>
                        <div className="row mt-7">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )


            case 2:
                return (
                    <div className="form3">
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
                        </div>
                        <div className="row mt-7">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handleNext}>
                                    Next
                                </button>
                            </div>
                        </div>

                    </div>
                )

            case 3:
                return (
                    <div className="form4">
                        <div className="row">
                            <div className="col d-flex justify-content-center mt-4">
                                <h1 className="txt">Select Category</h1>
                            </div>
                            

                        </div>
                        <div className="row mt-5">
                            <div className="col-4 col1">
                                <Card name={name1} image={plumbing} para={para}/>
                            </div>
                            <div className="col-4 col1">
                                <Card name={name2} image={electrician} para={para}/>
                            </div>
                            <div className="col-4 col1">
                                <Card name={name3} image={janitor} para={para}/>
                            </div>
                            <div className="col-4 col1">
                                <Card name={name4} image={maid} para={para}/>
                            </div>
                            <div className="col-4 col1">
                                <Card name={name5} image={security} para={para}/>
                            </div>
                            <div className="col-4 col1">
                                <Card name={"Custom"} image={more} para={para}/>
                            </div>

                            
                        </div>
                        <div className="row mt-7">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-info btn-lg next-button" onClick={handleNext}>
                                    Next
                                </button>
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
        // <div className="container mt-5">
        //     <div className="row gx-5 row1">
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //         <div className="col-1 col1">
        //             <Card name={name1} image={plumbing} para={para} />
        //         </div>
        //     </div>
        // </div>
        <div className="body">
            <div className="container job-form mt-5">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <div className="container">

                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="container">
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}