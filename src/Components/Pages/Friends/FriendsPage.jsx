import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { socket } from '../../../socket';
import axios from 'axios';
import fetchFriends from '../../../utils/friends';
import { capitalizeFirstLetter } from '../../../utils/utils';
import './FriendsPage.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FriendsPage = () => {
    const {setFriendList, friendList} = useOutletContext();

    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchSentRequests();
        fetchReceivedRequests();
        fetchFriends(setFriendList);

        socket.on('friendRequestRejectedOrAccepted', fetchSentRequests);
        socket.on('friendRequestReceived', fetchReceivedRequests);
        socket.on('friendRequestCanceled', fetchReceivedRequests);

        return () => {
            socket.off('friendRequestRejectedOrAccepted');
            socket.off('friendRequestReceived');
            socket.off('friendRequestCanceled');
        };
        
    }, [setFriendList]);

    useEffect(() => {
        if (username.length > 2) {
            axios.get(`${BASE_URL}/friends/search?username=${username}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setSuggestions(
                    response.data.filter(user => 
                        user.username !== currentUser.username && 
                        !friendList.some(friend => friend.username === user.username) &&
                        !sentRequests.some(request => request.receiver === user.username)
                    )
                  );
            })
            .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [username]);

    const sendFriendRequest = (friendUsername) => {
        setErrorMessage('');
        axios.post(`${BASE_URL}/friends/sendFriendRequest`, {
            username: friendUsername
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            fetchSentRequests();
            setUsername('');
            setSuggestions([]);
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.error === 'Friend request already sent')
                        setErrorMessage('Vous avez déjà envoyé une demande d\'ami à cette personne, attendez qu\'elle accepte votre demande');
                    else if (error.response.data.error === 'Friend request already received')
                        setErrorMessage('Vous avez reçu une demande d\'ami de cette personne, acceptez ou rejetez sa demande');
                    else
                        setErrorMessage("Vous ne pouvez pas envoyer d'invitation à cette personne");
                } else {
                    setErrorMessage('Une erreur s\'est produite lors de l\'envoi de la demande d\'ami');
                }
            } else {
                setErrorMessage('Une erreur inconnue s\'est produite lors de l\'envoi de la demande d\'ami');
            }
        });
    };

    const fetchSentRequests = () => {
        axios.get(`${BASE_URL}/friends/sentRequests`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => setSentRequests(response.data))
        .catch(error => console.error('Error fetching sent requests:', error));
    };

    const fetchReceivedRequests = () => {
        axios.get(`${BASE_URL}/friends/receivedRequests`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => setReceivedRequests(response.data))
        .catch(error => console.error('Error fetching received requests:', error));
    };

    const respondToRequest = (requestId, action) => {
        const endpoint = action === 'accept' ? '/friends/acceptFriendRequest' : '/friends/rejectFriendRequest';
        
        axios.post(`${BASE_URL}${endpoint}`, {
            requestId: requestId
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            fetchReceivedRequests(); // Update received requests
            fetchFriends(setFriendList);
        })
        .catch(error => console.error('Error responding to request:', error));
    };

    const handleCancelRequest = (requestId) => {
        axios.post(`${BASE_URL}/friends/cancelFriendRequest`, {
            requestId: requestId
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            fetchSentRequests(); 
        })
        .catch(error => console.error('Error responding to request:', error));
    };
    

    return (
        <div className="friend-request-container">
            <h2 className="friend-request-h2">Rechercher un ami</h2>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="search-bar"
            />

            {errorMessage && <p className="friend-request-error-message-friend">{errorMessage}</p>}
            
            {username && suggestions.length > 0 && (
                <ul className="friend-request-suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="friend-request-suggestion-item">
                            <span>{capitalizeFirstLetter(suggestion.username)}</span>
                            <button 
                                className="friend-request-add-icon" 
                                onClick={() => sendFriendRequest(suggestion.username)}>
                                    <i className="fas fa-user-plus"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h2 className="friend-request-h2">Demandes d&apos;amis envoyées</h2>
            <ul className="friend-request-requests-list">
                {sentRequests.length === 0 ? (
                    <p>Pas de demandes d&apos;amis envoyées en attente</p>
                ) : (
                    sentRequests.map((request, index) => (
                        <li key={index} className="friend-request-request-item">
                            <span>Invitation envoyé à <span className='friend-request-bold'>{capitalizeFirstLetter(request.receiver)}</span></span>
                            <button
                                className="friend-request-cancel-icon"
                                onClick={() => handleCancelRequest(request._id)}
                                aria-label="Annuler la demande"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>

            <h2 className="friend-request-h2">Demandes d&apos;amis reçues</h2>
            <ul className="friend-request-requests-list">
                {receivedRequests.length === 0 ? (
                    <p>Pas de demandes d&apos;amis en attente d&apos;acceptation</p>
                ) : (
                    receivedRequests.map((request, index) => (
                        <li key={index} className="friend-request-request-item">
                            <span>{capitalizeFirstLetter(request.sender)}</span>
                            <button 
                                className="friend-request-accept-icon" 
                                onClick={() => respondToRequest(request._id, 'accept')}>
                                    <i className="fas fa-user-check"></i>
                            </button>
                            <button 
                                className="friend-request-reject-icon" 
                                onClick={() => respondToRequest(request._id, 'reject')}>
                                    <i className="fas fa-user-times"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default FriendsPage;
