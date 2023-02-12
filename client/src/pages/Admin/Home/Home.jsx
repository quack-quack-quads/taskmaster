import "./Home.scss"
import Card from 'react-bootstrap/Card';
import { MdPendingActions } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import graph from "../../../assets/graph.gif"

// import { Chart } from 'react-charts'
import { ClientContext } from "../../../context/clientContext";
import Navbar from '../../../components/Navbar/Navbar'

import Hero from "../../../components/Hero/Hero";
import CategoryCards from '../../../components/CategoryCards/CategoryCards'
import Features from '../../../components/Features/Features'
// const cards = () => {
//     return (

//     )
// }

const baseURL = import.meta.env.VITE_BASE_URL;
const handleWorkerClick = (link) => {
    if (link !== null) {
        window.open(link, "_blank");
    }
    //console.log("clicked")
}

const verify = (type, email, workers, setWorkers,  adminId) => {
    var temp = [];
    //console.log(type, email, workers, setWorkers, adminId);
    for (var obj in workers) {
        var new_obj = workers[obj];
        //console.log(new_obj.email, email);
        if (new_obj.email === email) {
            if (type === 'approve') {
                axios.post(`${baseURL}/api/admin/approveWorker`, {
                    uid: adminId,
                    workerUid: new_obj.uid
                }).then(async (res) => {
                    new_obj.verified = true;
                }, (err) => {
                    //console.log(err);
                })
                continue
            }
        }
        temp.push(new_obj);
    }
    setWorkers(temp);
}

const Feature = (props) => {
    return (
        <div className={`${props.className} card-skeleton d-flex`}>
            <div className="card-outer d-flex">
                <Card className="feature-card card-inner">
                    <div className="row">
                        {props.img_pos == "top" && (
                            <img
                                src={props.static_img}
                                className="static-img col-12 col-md-6 col-lg-12"
                            />

                        )}

                        <div className="card-body col-12 col-md-6 col-lg-12">
                            <h3 className="card-title">{props.title}</h3>
                            <p className="card-text">{props.children}</p>
                        </div>
                        {props.img_pos == "bot" && (
                            <img
                                src={props.static_img}
                                className="static-img col-12 col-md-6 col-lg-12"
                            />
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

const PendingWorker = (props) => {
    return (
        <Card className="pt-card d-flex flex-row alig-items-center">
            <div className="open-worker">
                <BsFillArrowUpRightCircleFill size={'50'} className="open-worker" onClick={() => handleWorkerClick(props.image)} />
            </div>
            <div className="d-flex flex-column align-items-center flex-fill">
                <h4 className="invoice-id">{props.name}</h4>
                <h4 className="partner-pan">{props.email}</h4>
            </div>
            <div className="d-flex flex-column align-items-center flex-fill">
                <h4 className="date">{"Govmnt Id"}</h4>
                <h4 className="mode">{props.govt}</h4>
            </div>
            <div className="d-flex flex-row justify-content-center align-items-center flex-fill">
                <button type="button" class="btn btn-outline-info aprove rounded-pill" onClick={() => verify('approve', props.email, props.workers, props.setWorkers,  props.adminId)}><h4>Approve</h4></button>
                <button type="button" class="btn btn-outline-info reject rounded-pill" onClick={() => verify('reject', props.email, props.workers, props.setWorkers,  props.adminId)}><h4>Reject</h4></button>
            </div>
        </Card>
    )
}

const Home = (props) => {

    const [adminId, setadminId] = useState("lraSnpwLHlM2dvyqBmCoVuWGSCy2")
    const [workers, setWorkers] = useState([]);
    const [show, setShow] = useState(false)

    const { uid } = useContext(ClientContext);
    const [loggedIn, setLoggedIn] = useState(true);


    const fetchData = async () => {
        console.log("fetching data");   
        const response = await axios.post(`${baseURL}/api/admin/getWorkers`, {
            uid: adminId
        })
        const data = await response.data;
        //console.log(data);
        // filter data
        var temp = workers;
        for (var obj in data) {
            var new_obj = data[obj]
            new_obj.uid = obj;
            if (new_obj.verified === false) {

                temp.push(new_obj);
            }
        }
        console.log(temp); 
        setWorkers(temp);
    }


    useEffect(() => {
        if (uid == null || uid == undefined) setLoggedIn(false);
        else{
            console.log(uid); 
            fetchData();
            setLoggedIn(true);
        }
    }, [uid]);


    useEffect(() => {
        var obj = {
            method: 'POST',
            body: {
                uid: adminId
            }
        }
        axios.post(`${baseURL}/api/admin/getWorkers`, {
            uid: adminId
        }).then(async (res) => {
            var temp = workers;
            for (var obj in res.data) {

                var new_obj = res.data[obj]
                new_obj.uid = obj;
                if (new_obj.verified === false) {
    const data = [1, 2, 3, 5, 8, 13];

    useEffect(() => {
        fetchData();
    }, [])
                    temp.push(new_obj);
                }
            }
            // console.log(temp);
            setWorkers(temp);
            // res.json().then((res1) => {
            //     console.log(res1)
            // }, (err1) => {
            //     console.log(err1)
            // })
        }, (err) => {
            console.log(err);
        })

    }, [workers])


    return (
        <>
            <Navbar flow = "admin"/>
           { !loggedIn ?
            <>
                <Hero />
                <CategoryCards />
                <Features />
            </> :
                <div className="container-fluid admin-body">
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={() => setShow(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className="col d-flex justify-content-center">
                            Pending Workers
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body1">
                        {workers.map((items) => {
                            return (
                                <PendingWorker name={items.name} email={items.email} verified={"Un-Verified"} image={items.image !== undefined ? items.image : null} govt={items.govt !== undefined ? items.govt : null}
                                    workers={workers} setWorkers={setWorkers} adminId={adminId} />
                            )

                        })}
                    </Modal.Body>
                </Modal>
                <div className="row ">
                    <div className="col">
                        <h1 className="txt txt1">Admin Dashboard</h1>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col col-sm-6 col-xs-12 col-md-4 d-flex justify-content-center">
                        <div className="admin-card" onClick={() => setShow(!show)}>
                            <Feature
                                className="card1"
                                // static_img={<MdPendingActions />}
                                // icon={<MdPendingActions />}
                                img_pos="top"
                                title="Approve Workers"

                            >
                                <div className="col d-flex ">
                                    <p className="txt card1-text">Approve Pending workers </p>
                                </div>

                            </Feature>
                        </div>
                    </div>
                    <div className="col col-sm-6 col-xs-12 col-md-4 d-flex justify-content-center">
                        <div className="admin-card2">
                        <Feature
                            className="card1"
                            // static_img={<MdPendingActions />}

                            img_pos="top"
                            title="Active Users"

                        >
                            <div className="col  d-flex ">
                                <p className="txt card1-text">Current Active Users </p>
                            </div>

                        </Feature>
                    </div>
                </div>
                <div className="col col-sm-6 col-xs-12 col-md-4 d-flex justify-content-center">
                    <div className="admin-card3">
                        <Feature
                            className="card1"
                            // static_img={<MdPendingActions />}

                            img_pos="top"
                            title="Every  Users"

                        >
                            <div className="col  d-flex ">
                                <p className="txt card1-text">List All Users </p>
                            </div>

                        </Feature>
                        </div>
                    </div>
            </div>
            <div className="row mt-5">
                    <div className="col-4">
                    <img src={graph}></img>
                </div>
                <div className="col-4">

                </div>
                <div className="col-4">
                        <div className="admin-card3">
                        <Feature
                            className="card1"
                            // static_img={<MdPendingActions />}

                            img_pos="top"
                            title="Every  Users"

                        >
                            <div className="col  d-flex ">
                                <p className="txt card1-text">List All Users </p>
                            </div>

                        </Feature>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Home;