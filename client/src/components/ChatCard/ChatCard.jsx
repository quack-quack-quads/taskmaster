import "./ChatCard.scss"
import { BsArrowLeftShort } from "react-icons/bs"
import { useState, useEffect } from "react"
import { io } from "socket.io-client"
import axios from "axios"

const ChatCard = (props) => {
    const [socket, setSocket] = useState()
    const [messages, setMessages] = useState([])
    const handleGoBack = () => {
        props.handleCloseChat()
    }
    const [toSend, setToSend] = useState("")

    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL
        //console.log(props.chat.uid) 
        const getMessages = async () => {
            const response = await axios.post(`${url}/api/chat/get`, {
                jobId: props.chat.uid
            })
            setMessages(response.data)
        }
        getMessages()

        const s = io(url)
        setSocket(s)

        // ! join the room
        s.emit("join-room", props.chat.uid)

        // ! this is a cleanup function
        // ! this is called when the component is unmounted
        // ! prevents user from connecting to multiple sockets
        return () => {
            s.disconnect()
        }
    }, [])

    // ! listen for messages from the server
    useEffect(() => {
        if (socket === null || socket === undefined) return
        //console.log("socket is set to receive message")
        const handler = (message) => {
            //console.log("got a message")
            setMessages((messages) => [...messages, message])
        }
        // ! set up the event listener for changes and handler is our callback function
        socket.on("receive-message", handler)

        // ! remove event listener when component is unmounted
        return () => {
            socket.off("receive-message", handler)
        }

    }, [socket])

    const scrollToBottom = () => {
        const chatcard = document.querySelector(".chatcard")
        chatcard.scrollTop = chatcard.scrollHeight
    }

    useEffect(() => {
        // scroll to bottom of the messages
        scrollToBottom()
    }, [])

    const handleSendMessge = (message) => {
        const re = /^[0-9\b]+$/;
        if (!re.test(toSend)) {
            alert("Please enter a valid amount")
            return
        }
        if (socket === null || socket === undefined) return

        //console.log(props.chat.uid)
        const payloadData = {
            message,
            from: props.uid,
            to: props.chat.uid,
            amount: toSend
        }
        socket.emit("send-message", payloadData, props.chat.uid)
        //console.log(payloadData)
        setMessages((messages) => [...messages, payloadData])
        setToSend("")
        scrollToBottom()

    }

    const handleAccept = async (message) => {
        //console.log("accepting",message)
        const url = import.meta.env.VITE_BASE_URL
        const response = await axios.post(`${url}/api/jobs/acceptWorkerJob`, {
            userId: props.uid,
            jobId: props.chat.uid,
            workerId: message.from,
            startingBid: message.amount
        })
        //console.log(response) 
        //console.log(props.uid, props.chat.uid, message.from)
    }

    const chatMessage = (flow, message, index) => {
        return (
            <div key={index} className={`chat__message ${message.from === props.uid ? "self_msg" : "other_msg"}`}>
                <p className="chat__message--text">{message.message}</p>
                <div className="row">
                    <div className="col-6">
                        {
                            flow == "client" ?
                                <button className="btn btn-light" onClick={() => {
                                    handleAccept(message)
                                }}>
                                    Accept
                                </button> :
                                <></>
                        }

                    </div>
                    <div className="col-6 d-flex justify-content-end"
                        style={{ "fontSize": "12px" }}
                    >
                        {
                            flow == "client" ? "" :
                                <div className="from">
                                    {message.from}
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="chatcard">
            <div className="fixedsection">
                <BsArrowLeftShort
                    className="arrowbutton"
                    size={30}
                    onClick={handleGoBack}
                >
                </BsArrowLeftShort>
                <div className="chat__header">{props.chat.name}</div>
            </div>
            <div className="chatcol">
                {
                    messages.map((message, index) => {
                        return chatMessage(props.flow, message, index)
                    })
                }
            </div>
            {
                props.flow == "client" ?
                    <></> :
                    <div className="messagebar">
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            handleSendMessge(toSend)
                        }} >
                            <input type="text" className="form-control shadow-none"
                                placeholder="Enter message"
                                onChange={(event) => {
                                    setToSend(event.target.value)
                                }}
                            />
                        </form>
                    </div>
            }
        </div>
    )
}

export default ChatCard