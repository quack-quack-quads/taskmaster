import "./ChatWindow.scss"
import { BsChatDotsFill } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import ActionButton from "../Buttons/ActionButton"
import { Modal} from 'react-bootstrap'
import JobCard from "./JobCard/JobCard"
import React, { useState, useEffect } from 'react';

const ChatWindow = ({flow}) => {
    const [show, setShow] = useState(false)
    return (
        <>  
            <Modal show = {show}
            className= "chatModal"
            animation = {false}
            >   
                <JobCard></JobCard>
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