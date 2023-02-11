import "./ChatCard.scss"
import { BsArrowLeftShort } from "react-icons/bs"
import { useState, useEffect } from "react"
const ChatCard = (props) => {
    console.log(props)
    const [messages, setMessages] = useState([
        {
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "own"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "own"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "uid"
        },{
            message: "hello",
            from: "own"
        },{
            message: "hello",
            from: "uid"
        }
    ])
    const handleGoBack = () => {
        props.handleCloseChat()
    }

    useEffect(() => {
        // scroll to bottom of the messages
        const chatcard = document.querySelector(".container")
        chatcard.scrollTop = chatcard.scrollHeight
    })

    const chatMessage = (flow,message) => {
        return (
            <div className={`chat__message ${message.from === "own" ? "self_msg" : "other_msg"}`}>
                <p className="chat__message--text">{message.message}</p>
            </div>
        )
    }

    return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <BsArrowLeftShort
                        className="ml-3 arrowbutton"
                        size={50}
                        onClick={handleGoBack}
                    >
                    </BsArrowLeftShort> 
                </div>
                <div className="col-10">
                    <h2 className="chat__header">{props.chat.name}</h2>
                </div>
            </div>
            <hr />
            </div>
                <div className="container chatcard">
                    {
                        messages.map((message, index) => {
                            return chatMessage(props.flow, message) 
                        })
                    }   
                <div>
            </div>
        </div>
    </div>
    )
}

export default ChatCard