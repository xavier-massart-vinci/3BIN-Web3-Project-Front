import { useState, useEffect } from 'react';
import { socket } from '../../socket';
import './MessageBar.css';

function MessageBar({ sendMessage }) {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Écouter les erreurs du serveur
    useEffect(() => {
        const handleMessageError = (error) => {
            if (error && error.error) {
                setErrorMessage(error.error);
            }
        };

        socket.on('messageError', handleMessageError);

        // Nettoyer l'écouteur lors du démontage du composant
        return () => {
            socket.off('messageError', handleMessageError);
        };
    }, []);

    const handleMessage = (message) => {
        if (message.trim() === '') return;
        
        // Effacer tout message d'erreur précédent
        setErrorMessage('');

        const messageFormatted = { content: message, type: 'text' };
        
        // Envoyer le message
        sendMessage(messageFormatted);

        // Réinitialiser le champ de saisie
        setMessage('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessage(message);
        }
    };

    return (
        <>
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            <div className="message-bar">
                <textarea
                    className="message-input"
                    placeholder="Entrez votre message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button className="send-button" onClick={() => handleMessage(message)}>➤</button>
            </div>
        </>
    );
}

export default MessageBar;
