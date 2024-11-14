import { useEffect, useRef, useState } from 'react';
import './ChatBox.css';
import { socket } from '../../socket';

function ChatBox({ contact }) {
    const myUserId = JSON.parse(localStorage.getItem("user")).id;
    const [contactChat, setContactChat] = useState([]);
    let chatType = "globalChatMessage";
    let msg = {inGlobalChat: contact === undefined};
    
    if(contact !== undefined){
        chatType = "privateChatMessage";
        msg.contact = contact.user.id;
    }

    useEffect(() => {
       
        socket.emit('chatHistory', msg);

        socket.on('chatHistory', (history) => {
            if(history.length > 0){
                setContactChat(history);
            }
        })

        socket.on(chatType, (message) => {
            setContactChat((prev) => [...prev, message]);  
        });

        return () => {
            socket.off(chatType);
            socket.off("chatHistory");
        };

    }, [contact]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll automatique vers le bas quand un nouveau message est ajouté
        messagesEndRef.current?.scrollIntoView();
    }, [contactChat]);

    return (
        <div className="chatbox-messages">
            {contactChat.map((item, index) => (
                <div key={index} className="message">
                    <p><strong>From:</strong> {item.from}</p>
                    <p><strong>To:</strong> {item.to}</p>
                    <p><strong>Content:</strong> {item.content}</p>
                    <p><strong>Type:</strong> {item.type}</p>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatBox;


/* {contactChat?.messages && contactChat.messages.length > 0 ? (
                contactChat.messages
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
            ) : (
                <div className="chatbox-no-messages">
                   
                </div>
            )} */