import "./ChatWindow.scss"
import { BsChatDotsFill } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import ActionButton from "../Buttons/ActionButton"
import { Modal} from 'react-bootstrap'
import JobCard from "./JobCard/JobCard"
import ChatCard from "../ChatCard/ChatCard"
import React, { useState, useEffect } from 'react';

const ChatWindow = ({flow}) => {
    const [show, setShow] = useState(false)
    const [displayChat, setDisplayChat] = useState(false)
    const [chat, setChat] = useState(null)
    const [jobs, setJobs] = useState([
        {
                name:"job to do-1",
                from: "uid",
                address: "addresses[addressHighlight]",
                status: "bidOn",
                startingBid: "120",
                description: "descriptionsgasghajdskglhfkljggfaklhgklhfak;lsjgjk;ldjkl;gjf. ,klgjklsjkl ",
                category: "category",
                to: "",
                settled: "",
        },{
            
                name:"job to do-2",
                from: "uid",
                address: "addresses[addressHighlight]",
                status: "bidOn",
                startingBid: "120",
                description: "descriptionsgasghajdskglhfkljggfaklhgklhfak;lsjgjk;ldjkl;gjf. ,klgjklsjkl ",
                category: "category",
                to: "",
                settled: "",     
        },{
                name:"job to do-3",
                from: "uid",
                address: "addresses[addressHighlight]",
                status: "bidOn",
                startingBid: "120",
                description: "descriptionsgasghajdskglhfkljggfaklhgklhfak;lsjgjk;ldjkl;gjf. ,klgjklsjkl ",
                category: "category",
                to: "",
                settled: "",
        },{
                name:"job to do-4",
                from: "uid",
                address: "addresses[addressHighlight]",
                status: "bidOn",
                startingBid: "120",
                description: "descriptionsgasghajdskglhfkljggfaklhgklhfak;lsjgjk;ldjkl;gjf. ,klgjklsjkl ",
                category: "category",
                to: "",
                settled: "",
        }
    ])
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
                            return <JobCard key={index} id={index} handleOpenChat={handleOpenChat} />
                        })
                    }
                </>
                :
                <ChatCard chat={chat} handleCloseChat={handleCloseChat} flow={flow}/>
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