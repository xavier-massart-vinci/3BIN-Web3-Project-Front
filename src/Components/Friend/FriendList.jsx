import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../utlis/config';

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch friends list from the backend
        axios.get(`${config.BASE_URL}/friends/getFriends`)
            .then(response => setFriends(response.data))
            .catch(error => console.error('Error fetching friends list:', error));
    }, []);

    return (
        <ul>
            {friends.map(friend => (
                <li key={friend.id}>{friend.username}</li>
            ))}
        </ul>
    );
};

export default FriendList;
