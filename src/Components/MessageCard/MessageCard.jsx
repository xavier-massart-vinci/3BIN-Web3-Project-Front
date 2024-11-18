import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import './MessageCard.css';

function MessageCard({ message, isSent, showSenderInfo }) {
    const { friendList } = useOutletContext();

    useEffect(() => {
        if (message.type === 'error') {
            alert(message.content);
        }
    }, [message]);

    const renderContent = () => {
        switch (message.type) {
            case 'gif':
                return <img src={message.content} alt="GIF" className="message-gif" />;
            case 'image':
                return <img src={message.content} alt="Meme" className="message-image" />;
            case 'quote':
                return (
                    <blockquote className="message-quote">
                        &quot;<br />
                        {message.content}<br />
                        <div style={{ textAlign: 'right' }}>&quot;</div>
                    </blockquote>
                );
            default:
                return <span>{message.content}</span>;
        }
    };

    if (message.type === 'error') {
        return null; // Ne rien retourner si c'est une erreur
    }

    return (
        <div key={message.id} className={`chatbox-message-container ${isSent ? 'chatbox-message-container-sent' : 'chatbox-message-container-received'}`}>
            <div className="chatbox-header">
                {showSenderInfo && (
                    <span className="chatbox-username">
                        {isSent ? 'Vous - ' : friendList.find((u) => u.id === message.from)?.username + " - "}
                    </span>
                )}
                {showSenderInfo && (
                    <span className="chatbox-time">
                        {new Date(message.time).toLocaleDateString()} {new Date(message.time).toLocaleTimeString()}
                    </span>
                )}
            </div>

            <div className={`chatbox-message ${isSent ? 'chatbox-message-sent' : 'chatbox-message-received'}`}>
                {renderContent()}
            </div>
        </div>
    );
}

export default MessageCard;

