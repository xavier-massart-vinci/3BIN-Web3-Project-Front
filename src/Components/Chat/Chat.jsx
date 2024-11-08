import { useState, } from 'react';
import { useMatch } from "react-router-dom";
import ChatBox from '../ChatBox/ChatBox';
import './Chat.css';

const myUserIdHardcoded = 1;
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
    {
        contactId: 2,
        messages: [ 
            { id: 1, senderId: 1, content: "Salut", time: "2024-11-08T10:05:00Z" },
            { id: 2, senderId: 2, content: "Bonjour", time: "2024-11-08T10:06:00Z" },
            { id: 3, senderId: 1, content: "Ca va ?", time: "2024-11-08T10:07:00Z" },
            { id: 4, senderId: 2, content: "Ca va et toi?", time: "2024-11-08T10:08:00Z" },
            { id: 5, senderId: 1, content: "Je vais bien", time: "2024-11-08T10:09:00Z" },
            { id: 6, senderId: 2, content: "Cool", time: "2024-11-08T10:10:00Z" },
            { id: 7, senderId: 1, content: "Tu fais quoi ?", time: "2024-11-08T10:11:00Z" },
            { id: 8, senderId: 2, content: "Je suis occupé", time: "2024-11-08T10:12:00Z" },
            { id: 9, senderId: 1, content: "D'accord, je te laisse alors", time: "2024-11-08T10:13:00Z" },
            { id: 10, senderId: 2, content: "A plus", time: "2024-11-08T10:14:00Z" },
            { id: 11, senderId: 1, content: "A plus", time: "2024-11-08T10:15:00Z" },
        ],
    },
];
      

function Chat() {
    const [message, setMessage] = useState('');

    const match = useMatch("/contact/:userId");
    const userId = match?.params.userId;

    const sendMessage = () => {
        if (message.trim()) {
            const contactChat = hardcodedChats.find((chat) => chat.contactId.toString() === userId);
            contactChat.messages.push({ id: contactChat.messages[contactChat.messages.length-1].id +1, senderId: myUserIdHardcoded, content: message, time: new Date().toISOString() });
            setMessage('');
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            sendMessage(); 
        }
    };

    if (!userId) return (<div className="chat-container"><p>User not found</p></div>);
    const hardcodedUserName = `Contact ${userId}`;

    const contactChat = hardcodedChats.find((chat) => chat.contactId.toString() === userId);
    if (!contactChat) return (<div className="chat-container"><p>User not found</p></div>);

    return (
        <div className="chat-container">
        <ChatBox contactChat={contactChat} myUserId={myUserIdHardcoded} userName={hardcodedUserName} />

            <div className="message-bar">
                <textarea
                    className="message-input"
                    placeholder="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button className="send-button" onClick={sendMessage}>➤</button>
            </div>
        </div>
    );
}

export default Chat;
