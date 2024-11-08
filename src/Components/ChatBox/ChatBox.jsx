import { useEffect, useRef } from 'react';
import './ChatBox.css';

function ChatComponent({ contactChat, myUserId, userName }) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, []);

    return (
        <div className="chatbox-messages">
            {contactChat?.messages
                .sort((a, b) => new Date(a.time) - new Date(b.time))
                .map(msg => (
                    <div key={msg.id} className="chatbox-message-container">
                        <span className="chatbox-username">
                            {msg.senderId === myUserId ? 'Moi' : userName}
                        </span>
                        <div
                            className={`chatbox-message ${msg.senderId === myUserId ? 'chatbox-message-sent' : 'chatbox-message-received'}`}
                        >
                            <span>{msg.content}</span>
                        </div>
                        <span className="chatbox-time">
                            {new Date(msg.time).toLocaleDateString()} {new Date(msg.time).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default ChatComponent;
