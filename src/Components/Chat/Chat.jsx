import { useContext, useEffect, useState, } from 'react';
import { Navigate, useMatch, useOutletContext } from "react-router-dom";
import ChatBox from '../ChatBox/ChatBox';
import './Chat.css';
import { connect } from 'socket.io-client';

const hardcodedChats = [
    {
        contactId: 0,
        messages: [
            { id: 1, senderId: 0, content: "Salut", time: "2024-11-08T10:05:00Z" },
            { id: 2, senderId: 1, content: "Hello", time: "2024-11-08T10:06:00Z" },
            { id: 3, senderId: 0, content: "Comment ça va ?", time: "2024-11-08T10:07:00Z" },
            { id: 4, senderId: 1, content: "Bien et toi ?", time: "2024-11-08T10:08:00Z" },
            { id: 5, senderId: 0, content: "Je vais bien", time: "2024-11-08T10:09:00Z" },
            { id: 6, senderId: 1, content: "Cool", time: "2024-11-08T10:10:00Z" },
            { id: 7, senderId: 0, content: "Tu fais quoi ?", time: "2024-11-08T10:11:00Z" },
            { id: 8, senderId: 1, content: "Je travaille", time: "2024-11-08T10:12:00Z" },
            { id: 9, senderId: 0, content: "Ok", time: "2024-11-08T10:13:00Z" },
            { id: 10, senderId: 1, content: "A plus", time: "2024-11-08T10:14:00Z" },
            { id: 11, senderId: 0, content: "A plus", time: "2024-11-08T10:15:00Z" },
        ],
    },
];

function Chat() {
    const [message, setMessage] = useState('');
    const { sendMessage, chatMessages, userConnectedList } = useOutletContext();
    let isGlobalChat = false;
    const myUserId = JSON.parse(localStorage.getItem("user")).id;

    const match = useMatch("/chat/:userId");
    const userIdOfContact = match?.params.userId;
    let contactChat;

    if (userIdOfContact === "0") isGlobalChat = true;


    if(isGlobalChat){ 
        contactChat = chatMessages[userConnectedList.find((u) => u.user.id === "0")];
    }else{
        // Get the chat id in the table with the contact
        const idOfChat = userConnectedList.find((u) => u.user.id === userIdOfContact);
        if(idOfChat === undefined){ 
            return (<p>Chat not found</p>);
            //return (<Navigate to="/char/0"/>); // TOFIX : Redirect to the global chat
        }
        contactChat = chatMessages[idOfChat];
    }



    const handleMessage = (message) => {
        sendMessage(myUserId, isGlobalChat ? "0" : userIdOfContact, message);
        setMessage('');
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleMessage(message);
        }
    };

    //TODO userName change for global chat don't work fetch the id in message and get the username
    return (
        <div className="chat-container">
            <ChatBox contactChat={contactChat} myUserId={myUserId} userName={"ddd"} />

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
