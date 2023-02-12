import './ClientDashboard.scss'
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
import JobListing from '../../../components/JobListing'

import { ClientContext } from '../../../context/clientContext'
import { useContext, useState, useEffect } from 'react';

import Clock from '../../../assets/clock.gif';
import Auction from '../../../assets/auction.gif';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import { FaWindowClose } from 'react-icons/fa';

const PendingTaskCard = (title, description, startingBid) => {
    return <div className="PendingTaskCard container-fluid">
        <div className="row titlerow text-center">
            {title}
        </div>
        <div className="row descrow text-center">
            {description}
        </div>
        <div className="row bidrow text-center">
            Current Bid : {startingBid}
        </div>
        <div className="row actions d-flex justify-content-center">
            <button className="btn btn-danger btn-sm">
                Delete
            </button>
            <button className="btn btn-success btn-sm">
                Mark as done
            </button>
        </div>
    </div>
}

const ListingCard = (title, description, startingBid) => {
    return <div className="PendingTaskCard container-fluid">
        <div className="row titlerow text-center">
            {title}
        </div>
        <div className="row descrow text-center">
            {description}
        </div>
        <div className="row bidrow text-center">
            Current Bid : {startingBid}
        </div>
        <div className="row actions d-flex justify-content-center">
            <button className="btn btn-danger btn-sm">
                Delete
            </button>
        </div>
    </div>
}


const ClientDashboard = () => {
    const { uid, name, email, phone } = useContext(ClientContext);
    const [showListing, setShowListing] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (uid == null || uid == undefined) {
            setLoggedIn(false);
        } else setLoggedIn(true);
    }, [uid]);

    const [jobs, setJobs] = useState([])

    const pendingList = []
    const listings = []
    for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].status === "bidOn") {
            listings.push(
                ListingCard(jobs[i].title, jobs[i].description, jobs[i].startingBid)
            )
        } else if (jobs[i].status === "pending") {
            pendingList.push(
                PendingTaskCard(jobs[i].title, jobs[i].description, jobs[i].startingBid)
            )
        }
    }
    
    <JobListing show={showListing} setShow={setShowListing} />

    const getJobs = async () => {
        //console.log("getting jobs")
        const url = import.meta.env.VITE_BASE_URL
        const response = await axios.post(`${url}/api/jobs/get`, {
            uid: uid
        })
        //console.log(response.data)
        setJobs(response.data)
    }

    useEffect(() => {
        getJobs()
        for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].status === "bidOn") {
                listings.push(
                    ListingCard(jobs[i].title, jobs[i].description, jobs[i].startingBid)
                )
            } else if (jobs[i].status === "pending") {
                pendingList.push(
                    PendingTaskCard(jobs[i].title, jobs[i].description, jobs[i].startingBid)
                )
            }
        }
    }, [])

    return <div className="Dash">
        <div className="dummy"> </div>
        <Modal
            show={showListing}
            onHide={() => {
                setShowListing(false);
            }}
            backdrop="static"
            className="mod"
            centered
            size="lg"
        >
            <Modal.Title className='modtitle'>
                <div className="close"
                    onClick={() => {
                        setShowListing(false);
                    }}
                >
                    <FaWindowClose />
                </div>
            </Modal.Title>
            <Modal.Body >
                <JobListing setShow={setShowListing} />
            </Modal.Body>
        </Modal>
        {
            !loggedIn ?
                <>
                    <Hero />
                    <CategoryCards />
                    <Features />
                </>
                :
                <div className="ClientDashboard">
                    <div className="row pt-5">
                        <div className="col-12 col-md-6">
                            <div className="Welcome">
                                Welcome {name}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <div className='m-5'>
                                <p style={{ "color": "white" }}>
                                    Looking to find workers to get your job done?
                                </p>
                                <button className="btn btn-light btn-lg"
                                    onClick={
                                        () => {
                                            setShowListing(true)
                                        }
                                    }
                                >
                                    List Job Now
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row pt-5 pendingrow">
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <div>
                                <img src={Clock}></img>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 pb-5">
                            <div className="listheading text-center">
                                Pending Tasks
                            </div>
                            <div className="taskcol">
                                {
                                    pendingList
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row pt-5 listedrow">
                        <div className="col-12 col-md-6 pb-5">
                            <div className="listheading text-center">
                                Listed Tasks
                            </div>
                            <div className="taskcol">
                                {
                                    listings
                                }
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                            <div>
                                <img src={Auction}></img>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </div>
}

export default ClientDashboard;