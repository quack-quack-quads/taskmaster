import './BusinessDashboard.scss'
import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'

import { BusinessContext } from '../../../context/businessContext'
import { useContext, useState, useEffect } from 'react';

import Clock from '../../../assets/clock.gif';
import Auction from '../../../assets/auction.gif';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const PendingTaskCard = (title, description, startingBid) => {
    console.log(title, description, startingBid);
    return <div className="PendingTaskCard container-fluid">
        <div className="row titlerow text-center">
            {title}
        </div>
        <div className="row descrow text-center">
            <div className='col'>
                <h1>{description}</h1>
            </div>

        </div>
        <div className="row bidrow text-center">
            Current startingBid : {startingBid}
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
        <div className="row titlerow text-center des" >
            {title}
        </div>
        <div className="row descrow text-center des">
            {description}
        </div>
        <div className="row bidrow text-center des">
            Current startingBid : {startingBid}
        </div>
        <div className="row actions d-flex justify-content-center">
            <button className="btn btn-danger btn-sm">
                Delete
            </button>
        </div>
    </div>
}


const BusinessDashboard = () => {
    const { uid, name, email, phone } = useContext(BusinessContext);
    const [busLog, setBusLog] = useState(false);
    const [pendingTask, setPendingTask] = useState([]);


    const [pending, setPending] = useState([])

    useEffect(() => {
        // console.log(pendingTask)
        if (pendingTask.length === 0) {
            // console.log(uid)
            axios.post(`${baseURL}/api/jobs/getJobsWorker`, {
                uid: uid,
            }).then((res) => {
                // console.log(res.data)
                setPendingTask(res.data);
                // console.log(res.data);
            }, (err) => {
                //console.log(err);
            })
        }
    })

    // useEffect(() => {
    //     if (uid == null || uid == undefined) {
    //         setBusLog(false);
    //     } else {
    //         console.log("madi uid", uid);
    //         // getJobs();
    //     }
    // }, [uid]);


    const [pendingList, setPendingList] = useState([])
    const [listings, setListing] = useState([])

    useEffect(() => {
        var temp1 = [], temp2 = [];
        for (var i = 0; i < pendingTask.length; i++) {
            var ob = {
                title: pendingTask[i].title,
                desc: pendingTask[i].description,
                bid: pendingTask[i].startingBid
            }
            temp1.push(
                ob
            )
            temp2.push(
                ListingCard(pendingTask[i].title, pendingTask[i].description, pendingTask[i].startingBid)
            )
        }
        setPendingList(temp1)
        setListing(temp2)
        //console.log(temp1)
        //console.log(temp2)
    }, [pendingTask])


    //console.log(listings)

    return <div className="Dash">
        {console.log(uid)}
        <div className="dummy"> </div>
        {

            (uid === null || uid == undefined) ?
                <>
                    <Hero />
                    <CategoryCards />
                    <Features />
                </>
                :
                <div className="BusinessDashboard">
                    <div className="row pt-5">
                        <div className="col-12 col-md-6">
                            <div className="Welcome">
                                Welcome {uid}
                            </div>
                        </div>
                        <div className="col-12 col-md-6 d-flex align-items-center">
                            <div className='m-5'>
                                <p style={{ "color": "white" }}>
                                    Looking for jobs?
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
                                    pendingList.map((items) => {
                                        return <div className="PendingTaskCard container-fluid">
                                            <div className="row titlerow text-center">
                                                {items.title}
                                            </div>
                                            <div className="row descrow text-center">
                                                <div className='col'>
                                                    <h1 className='des'>{items.desc}</h1>
                                                </div>

                                            </div>
                                            <div className="row bidrow text-center">
                                                <p className='des'>Current startingBid : {items.bid}</p>
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
                                })
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

export default BusinessDashboard;