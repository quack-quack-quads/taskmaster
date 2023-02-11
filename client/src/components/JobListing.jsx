import "./JobListing.scss"
import Card from "./Card"
import plumbing from "../assets/plumbing.png"

import { useState } from 'react'

export default function JobListing() {

    const [name1, setName] = useState("Plumber");
    const [para, setPara] = useState("Install, repair, and maintain pipes, valves, fittings, drainage systems.")

    const [curr, setCurr] = useState(0);

    // Form data
    const [clientname, setclientName] = useState("");
    const [bid, setBid] = useState(0)

    const handleNameChange = (event) => {
        setclientName(event.target.value);
    }
    const handleBidChange = (event) => {
        setBid(event.target.value);
    }
    const handleNext = (event) => {
        setCurr(curr + 1);
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
                            {curr === 0 ?
                                <div>
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

                                : 1 ?
                                    <div>
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
                                    : 3 ?
                                        <div>
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
                                        : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}