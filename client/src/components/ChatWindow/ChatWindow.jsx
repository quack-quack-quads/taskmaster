import "./ChatWindow.scss"
import {BsChatDotsFill} from "react-icons/bs"
import {GrFormClose} from "react-icons/gr"
const ChatWindow = () => {

    const openChat = () => {
        console.log("open chat")
        var element = document.querySelector('.floating-chat');
        var messages = element.querySelector('.messages');
        var textInput = element.querySelector('.text-box');
        // element.find('>i').hide();
        // element.addClass('expand');
        // element.find('.chat').addClass('enter');

        var strLength = textInput.val().length * 2;
        textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
        element.off('transitionend', openElement);
        element.find('.header button').click(closeElement);
        element.find('#sendMessage').click(sendNewMessage);
        // element.off('click', openElement);
        // element.find('.header button').click(closeElement);
        // element.find('#sendMessage').click(sendNewMessage);
        messages.scrollTop(messages.prop("scrollHeight"));
    }

    return (
        <div className="floating-chat">
            {/* ! OPEN CHAT BUTTON */}
            <i className="fa fa-comments" aria-hidden="true"></i>
            <BsChatDotsFill onClick={openChat} />
            <div className="chat">
                <div className="header">
                    <span className="title">
                        what's on your mind?
                    </span>
                    <button>
                                    {/* ! CLOSE BUTTON */}
                                    {/* <i className="fa fa-times" aria-hidden="true"></i> */}
                        <GrFormClose/>
                    </button>
                                
                </div>
                <ul className="messages">
                    <li className="other">asdasdasasdasdasasdasdasasdasdasasdasdasasdasdasasdasdas</li>
                    <li className="other">Are we dogs??? 🐶</li>
                    <li className="self">no... we're human</li>
                    <li className="other">are you sure???</li>
                    <li className="self">yes.... -___-</li>
                    <li className="other">if we're not dogs.... we might be monkeys 🐵</li>
                    <li className="self">i hate you</li>
                    <li className="other">don't be so negative! here's a banana 🍌</li>
                    <li className="self">......... -___-</li>
                </ul>
                <div className="footer">
                    <div className="text-box" contenteditable="true" disabled="true"></div>
                    <button id="sendMessage">send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow