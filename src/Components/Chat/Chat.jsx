import {  useState, } from 'react';
import {  useMatch, useOutletContext } from "react-router-dom";
import ChatBox from '../ChatBox/ChatBox';
import './Chat.css';
import { socket } from '../../socket';


function Chat() {
    const [ message, setMessage ] = useState('');
    const { userConnectedList } = useOutletContext();
    const match = useMatch("/chat/:userId");
    let contactChatId = match?.params.userId;
    let contact = undefined;

    if(contactChatId !== undefined){ // don't check if global chat
        // security check
        contact =  userConnectedList.find((u) => u.user.id === contactChatId); 
     if(contactChatId === undefined){
        return ("<p>User not found</p>");
     }
    }

    const handleMessage = (message) => {
        if(message === '') return;
        const fromUserId = JSON.parse(localStorage.getItem("user")).id;
        const messageFormatted = { from: fromUserId,  content: message, type: "text"};
        
        if(contactChatId === undefined){
            socket.emit("globalChatMessage", {...messageFormatted, to: "global", toSocket: "global"});
        }else{
            socket.emit("privateChatMessage", {...messageFormatted, to: contact.user.id, toSocket: contact.socketId});
        }
        setMessage('');
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleMessage(message);
        }
    };

    return (
        <div className="chat-container">
            
            <ChatBox contact={contact} />

            <div className="message-bar">
                <textarea
                    className="message-input"
                    placeholder="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button className="send-button" onClick={handleMessage}>➤</button>
            </div>
        </div>
    );
}

export default Chat;
