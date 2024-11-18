import { useState, useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import { socket } from '../../socket';
import axios from 'axios';
import { FaUserPlus, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import fetchFriends from '../FriendList/fetchFriends';
import './FriendRequest.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FriendRequest = () => {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const {setFriendList} = useOutletContext();

    useEffect(() => {
        // Fetch sent and received friend requests when the component mounts
        fetchSentRequests();
        fetchReceivedRequests();
        fetchFriends(setFriendList);

        // Écouter le message socket pour la mise à jour des amis
        socket.on('friendAdded', () => {
            console.log('Friend added, refreshing friend list...');
            fetchFriends(setFriendList);
        });

        return () => {
            socket.off('friendAdded');
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
                    setSuggestions(response.data);
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
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage('An unexpected error occurred');
                    }
                } else {
                    setErrorMessage('Error sending friend request');
                }
            });
    };

    const fetchSentRequests = () => {
        axios.get(`${BASE_URL}/friends/sentRequests`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => 
                {
                    console.log(response.data);
                    setSentRequests(response.data)
                })
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
            fetchReceivedRequests(); // Mettre à jour les demandes reçues
            fetchSentRequests(); // Mettre à jour les demandes envoyées
            fetchFriends(setFriendList);
        })
        .catch(error => console.error('Error responding to request:', error));
    };
    

    return (
        <div className="friend-request-container">
            <h2>Rechercher un ami</h2>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="ex:JohnDoe"
                className="search-bar"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {username && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="suggestion-item">
                            <span>{suggestion.username}</span>
                            <FaUserPlus
                                className="add-icon"
                                onClick={() => sendFriendRequest(suggestion.username)}
                            />
                        </li>
                    ))}
                </ul>
            )}

            <h2>Demandes d&apos;ami envoyées</h2>
            <ul className="requests-list">
                {sentRequests.length === 0 ? (
                    <p>Pas de demandes d&apos;ami envoyées en attente</p>
                ) : (
                    sentRequests.map((request, index) => (
                        <li key={index} className="request-item">
                            <span>Invitaion envoyé à {request.receiver}</span>
                            <span>Status: {request.status}</span>
                        </li>
                    ))
                )}
            </ul>

            <h2>Demandes d&apos;ami reçues</h2>
            <ul className="requests-list">
                {receivedRequests.length === 0 ? (
                    <p>Pas de demandes d&apos;ami en attente d&apos;acceptation</p>
                ) : (
                    receivedRequests.map((request, index) => (
                        <li key={index} className="request-item">
                            <span>{request.sender}</span>
                            <FaUserCheck
                                className="accept-icon"
                                onClick={() => respondToRequest(request._id, 'accept')}
                            />
                            <FaUserTimes
                                className="reject-icon"
                                onClick={() => respondToRequest(request._id, 'reject')}
                            />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default FriendRequest;
