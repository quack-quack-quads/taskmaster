import "./ChatCard.scss"
import { BsArrowLeftShort } from "react-icons/bs"
import { useState, useEffect } from "react"
const ChatCard = (props) => {
    console.log(props)
    const [messages, setMessages] = useState([
        {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "own"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "own"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "uid"
        }, {
            message: "hello",
            from: "own"
        }, {
            message: "hello",
            from: "uid"
        }
    ])
    const handleGoBack = () => {
        props.handleCloseChat()
    }

    useEffect(() => {
        const chatcard = document.querySelector(".chatcard")
        chatcard.scrollTop = chatcard.scrollHeight
    })

    const chatMessage = (flow, message) => {
        return (
            <div className={`chat__message ${message.from === "own" ? "self_msg" : "other_msg"}`}>
                <p className="chat__message--text">{message.message}</p>
                <div className="row">
                    <div className="col-6">
                        {
                            flow == "client" ?
                                <button className="btn btn-light">
                                    Accept
                                </button> :
                                <></>
                        }

                    </div>
                    <div className="col-6 d-flex justify-content-end"
                    style={{"fontSize" : "12px"}}
                    >
                        <div className="from">
                            {message.from}
                        </div>
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
                        return chatMessage(props.flow, message)
                    })
                }
            </div>
            {
                props.flow == "client" ?
                    <></> :
                    <div className="messagebar">
                        <input type="email" className="form-control shadow-none"
                            placeholder="Enter message"
                            onChange={(event) => {
                                setEmailAdd(event.target.value);
                            }}
                        />
                    </div>
            }
        </div>
    )
}

export default ChatCard