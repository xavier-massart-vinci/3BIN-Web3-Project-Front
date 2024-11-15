import {  useState, } from 'react';
import './MessageBar.css';

function MessageBar({ sendMessage }) {
    const [ message, setMessage ] = useState('');

    const handleMessage = (message) => {
        if(message.trim() === '') return;
        const messageFormatted = {content: message, type: "text"};
        sendMessage(messageFormatted)
        setMessage('');
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); 
            handleMessage(message);
        }
    };

    return (
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
    );
}

export default MessageBar;
