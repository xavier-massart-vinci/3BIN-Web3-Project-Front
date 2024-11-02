import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../utlis/config';

const AddFriend = () => {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (username.length > 2) {
            axios.get(`${config.BASE_URL}/friends/search?username=${username}`)
                .then(response => setSuggestions(response.data))
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [username]);

    const addFriend = (friendUsername) => {
        axios.post(`${config.BASE_URL}/friends/addFriend`, { username: friendUsername })
            .then(response => console.log('Friend added:', response.data))
            .catch(error => console.error('Error adding friend:', error));
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Search for friends by username"
            />
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => addFriend(suggestion.username)}>
                        {suggestion.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddFriend;
