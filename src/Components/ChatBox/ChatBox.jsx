import { useEffect, useRef } from 'react';
import './ChatBox.css';

function ChatBox({ contactChat, myUserId, userName }) {
    const messagesEndRef = useRef(null);

    const getTimeDifferenceInMinutes = (date1, date2) => {
        return (new Date(date2) - new Date(date1)) / 1000 / 60;
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [contactChat]);

    return (
        <div className="chatbox-messages">
            {contactChat?.messages
                .sort((a, b) => new Date(a.time) - new Date(b.time))
                .map((msg, index, messages) => {
                    const isSent = msg.senderId === myUserId;
                    const prevMessage = messages[index - 1];
                    
                    const isTimeDifferenceLarge = prevMessage ? getTimeDifferenceInMinutes(prevMessage.time, msg.time) >= 10 : true;
                    const isSameSenderAsPrevious = prevMessage && prevMessage.senderId === msg.senderId;

                    return (
                        <div key={msg.id} className={`chatbox-message-container ${isSent ? 'chatbox-message-container-sent' : 'chatbox-message-container-received'}`}>
                            <div className="chatbox-header">
                                {(isTimeDifferenceLarge || !isSameSenderAsPrevious) && (
                                    <span className="chatbox-username">
                                        {isSent ? 'Vous - ' : userName + " - "}
                                    </span>
                                )}
                                {(isTimeDifferenceLarge || !isSameSenderAsPrevious) && (
                                    <span className="chatbox-time">
                                        {new Date(msg.time).toLocaleDateString()} {new Date(msg.time).toLocaleTimeString()}
                                    </span>
                                )}
                            </div>

                            <div className={`chatbox-message ${isSent ? 'chatbox-message-sent' : 'chatbox-message-received'}`}>
                                <span>{msg.content}</span>
                            </div>
                        </div>
                    );
                })
            }
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatBox;
