import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../utlis/config';
import { FaUserPlus } from 'react-icons/fa'; // For the add friend icon
import './AddFriend.css';

const AddFriend = () => {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            axios.get(`${config.BASE_URL}/friends/search?username=${username}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            })
                .then(response => {
                    setSuggestions(response.data);
                    console.log('Suggestions:', suggestions.map(suggestion => suggestion.username));
                })
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [username]);

    const addFriend = (friendUsername) => {
        console.log('Adding friend:', friendUsername);
        axios.post(`${config.BASE_URL}/friends/addFriend`, {
            username: friendUsername // Only the username is needed here
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => console.log('Friend added:', response.data))
            .catch(error => console.error('Error adding friend:', error));
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
