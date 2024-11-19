import {  useState, useEffect } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import './MessageBar.css';

function MessageBar({ sendMessage }) {
    const [ message, setMessage ] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [indexButtonEmoji, setIndexButtonEmoji] = useState(0);
    const [sendButtonSize, setSendButtonSize ] = useState('normal');
    const [emojiButtonSize, setEmojiButtonSize ] = useState('normal');

    const buttonEmojis = ['😎', '😊', '🥺', '😂', '😍'];

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.closest('.message-bar-emoji-picker') || event.target.closest('.message-bar-emoji-button')) return; 
            setShowEmojiPicker(false)
        };

        const handleEscapeKey = (event) => {
            if (event.key !== 'Escape') return;
            setShowEmojiPicker(false);
        };

        window.addEventListener('keydown', handleEscapeKey);
        window.addEventListener('mousedown', handleOutsideClick);

        return () => {
            window.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleMessage = () => {
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

    const handleMouseEnter = () => {
        setIndexButtonEmoji(indexButtonEmoji+1);
        setEmojiButtonSize('large');
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

            {showEmojiPicker && (
                <div className="message-bar-emoji-picker">
                    <Picker 
                        data={data} 
                        onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji.native)}  
                        locale="fr" 
                        theme="light"
                    />
                </div>
            )}

            <button 
                className={`message-bar-emoji-button ${emojiButtonSize === 'large' ? 'message-bar-button-large ' : ''}`}
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setEmojiButtonSize('normal')}
            >
                {buttonEmojis[indexButtonEmoji % buttonEmojis.length]}
            </button>

            <button 
                className={`message-bar-send-button ${sendButtonSize === 'large' ? 'message-bar-button-large ' : ''}`}
                onClick={handleMessage}
                onMouseEnter={() => setSendButtonSize('large')}
                onMouseLeave={() => setSendButtonSize('normal')}
            >
                ➤
            </button>
        </div>
    );

}

export default MessageBar;
