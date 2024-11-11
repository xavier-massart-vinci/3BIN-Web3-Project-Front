import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa'; // For the add friend icon
import fetchFriends from './fetchFriends'; // Import the fetchFriends function
import './AddFriend.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const AddFriend = ({ setFriends }) => {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

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

    const addFriend = (friendUsername) => {
        console.log('Adding friend:', friendUsername);

        // Reset error message before making a new request
        setErrorMessage('');

        axios.post(`${BASE_URL}/friends/addFriend`, {
            username: friendUsername // Only the username is needed here
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log('Friend added:', response.data)
                fetchFriends(setFriends)
                setUsername('')
                setSuggestions([])
            })
            .catch(error => {
                // Handle errors based on the status code
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage(error.response.data.message);
                    } else if (error.response.status === 404) {
                        setErrorMessage('User not found');
                    } else {
                        setErrorMessage('An unexpected error occurred');
                    }
                } else {
                    setErrorMessage('Error adding friend');
                }
            });
    };

    return (
        <div className="add-friend-container">
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Search for friends by username"
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
                                onClick={() => addFriend(suggestion.username)}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddFriend;
