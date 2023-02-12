import "./ChatWindow.scss"
import { BsChatDotsFill } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import ActionButton from "../Buttons/ActionButton"
import { Modal} from 'react-bootstrap'
import JobCard from "./JobCard/JobCard"
import ChatCard from "../ChatCard/ChatCard"
import React, { useState, useEffect, useContext } from 'react';
import { BusinessContext } from "../../context/businessContext"
import { ClientContext } from "../../context/clientContext"
import axios from "axios"

const ChatWindow = ({flow}) => {
    const [show, setShow] = useState(false)
    const [displayChat, setDisplayChat] = useState(false)
    const [chat, setChat] = useState(null)
    const [jobs, setJobs] = useState([])

    const {uid} = useContext(ClientContext);
    // const {uid} = flow == "client" ? useContext(ClientContext) : useContext(BusinessContext);
    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL
        if(flow === "client"){
            const getJobs = async() => {
                const response = await axios.post(`${url}/api/jobs/get`, {
                    uid: uid
                }) 
                console.log(response.data)
                // only the jobs who have to field === ""
                const filtered = response.data.filter((job) => {
                    return job.to === ""
                })
                console.log(filtered)
                setJobs(filtered) 
            }
            getJobs()
        }else if(flow === "business"){
            const getJobs = async() => {
                const response = await axios.get(`${url}/api/jobs/getAll`) 
                console.log(response.data)
                // only the jobs who have to field === ""
                const filtered = response.data.filter((job) => {
                    return job.to === ""
                })
                setJobs(filtered) 
            }
            getJobs()
        }
        console.log(uid)  
    },[uid])

    const handleOpenChat = (id) => {
        setChat(jobs[id])   
        setDisplayChat(true)
    }
    const handleCloseChat = () => {
        setDisplayChat(false)
    }
    return (
        <>  
            <Modal show = {show}
            className= "chatModal"
            animation = {false}
            >   
            {
                !displayChat ? 
                <>
                    {
                        jobs.map((job, index) => {
                            return <JobCard key={index} id={index} handleOpenChat={handleOpenChat}
                            job = {jobs[index]}/>
                        })
                    }
                </>
                :
                <ChatCard chat={chat} handleCloseChat={handleCloseChat} flow={flow} uid={uid}/>
            }
                <button className="btn btn-warning floatingbtn"
                    onClick={()=>{setShow(false)}}
                    >
                        <GrFormClose size={25} />
                    </button>
            </Modal>
            
            <button className="btn btn-warning floatingbtn"
            onClick={()=>{setShow(true)}}
            >
                <BsChatDotsFill size={25} />
            </button>
        </>
    )
}

export default ChatWindow