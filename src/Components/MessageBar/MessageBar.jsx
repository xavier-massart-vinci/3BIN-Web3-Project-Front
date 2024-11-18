import { useState } from 'react';
import './MessageBar.css';

function MessageBar({ sendMessage }) {
    const [message, setMessage] = useState('');
    const [showCommands, setShowCommands] = useState(false);
    const [filteredCommands, setFilteredCommands] = useState([]);
    const commands = ['/gif', '/meme', '/citation', '/ascii'];

    const handleMessage = (message) => {
        if (message.trim() === '') return;
        const messageFormatted = { content: message, type: "text" };
        sendMessage(messageFormatted);
        setMessage('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessage(message);
            setShowCommands(false); // Masquer la liste de commandes après l'envoi du message
        } else if (event.key === 'Tab' && showCommands && filteredCommands.length > 0) {
            event.preventDefault();
            setMessage(filteredCommands[0]);
            setShowCommands(false);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setMessage(value);

        if (value.startsWith('/')) {
            const filtered = commands.filter(command => command.startsWith(value));
            setFilteredCommands(filtered);
            setShowCommands(true);
        } else {
            setShowCommands(false);
        }
    };

    const handleCommandClick = (command) => {
        setMessage(command);
        setShowCommands(false);
    };

    return (
        <div className="message-bar-container">
            {showCommands && (
                <div className="commands-list">
                    {filteredCommands.map((command, index) => (
                        <div key={index} className="command-item" onClick={() => handleCommandClick(command)}>
                            {command}
                        </div>
                    ))}
                </div>
            )}
            <div className="message-bar">
                <textarea
                    className="message-input"
                    placeholder="message"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button className="send-button" onClick={() => handleMessage(message)}>➤</button>
            </div>
        </div>
    );
}

export default MessageBar;