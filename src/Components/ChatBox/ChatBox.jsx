import { useEffect, useRef, useState } from 'react';
import './ChatBox.css';
import { socket } from '../../socket';
import MessageCard from '../MessageCard/MessageCard';

function ChatBox({ currentContact }) {
    const [contactChat, setContactChat] = useState([]);

    const myUserId = JSON.parse(localStorage.getItem("user")).id;
    const isInGlobalChat = currentContact === undefined;
    const chatType = isInGlobalChat ? "globalChatMessage" : "privateChatMessage";

    useEffect(() => {
       
        socket.emit('chatHistory', {
            inGlobalChat: isInGlobalChat, 
            contact: isInGlobalChat ? null : currentContact.id 
        });

        socket.on('chatHistory', (history) => {
            setContactChat(history);
        })

        socket.on(chatType, (message) => {
            setContactChat((prev) => [...prev, message]);  
        });

        return () => {
            socket.off(chatType);
            socket.off("chatHistory");
        };

    }, [currentContact]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Scroll automatique vers le bas quand un nouveau message est ajouté
        messagesEndRef.current?.scrollIntoView();
    }, [contactChat]);

    const getTimeDifferenceInMinutes = (date1, date2) => {
        return (new Date(date2) - new Date(date1)) / 1000 / 60;
    };

    if (!contactChat || contactChat.length === 0) {
        return;
    }

    return (
        <div className="chatbox-messages">
            {contactChat
                .sort((a, b) => new Date(a.time) - new Date(b.time))
                .map((msg, index, messages) => {
                    const isSent = msg.from === myUserId;
                    const prevMessage = messages[index - 1];
                    
                    const isTimeDifferenceLarge = prevMessage ? getTimeDifferenceInMinutes(prevMessage.time, msg.time) >= 10 : true;
                    const isSameSenderAsPrevious = prevMessage && prevMessage.from === msg.from;

                    return <MessageCard key={msg.id} message={msg} isSent={isSent} isTimeDifferenceLarge={isTimeDifferenceLarge} isSameSenderAsPrevious={isSameSenderAsPrevious}/>;
                })
            }

            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatBox;