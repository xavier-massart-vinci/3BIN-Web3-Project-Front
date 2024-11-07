import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../utlis/config';
import './FriendList.css';  // Import CSS for styling

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch friends list from the backend
        axios.get(`${config.BASE_URL}/friends/getFriends`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                console.log(response.data);
                setFriends(response.data);
            })
            .catch(error => console.error('Error fetching friends list:', error));
    }, []);

    // Function to delete a friend
    const deleteFriend = (friendUsername) => {
        axios.post(`${config.BASE_URL}/friends/deleteFriend`, {
            username: friendUsername // Only the username is needed here
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }

        })
            .then(response => console.log('Friend added:', response.data))
            .catch(error => console.error('Error deleting friend:', error));
    };

    return (
        <div className="friend-list-container">  
            <div className="friend-list-box">
                <table className="friend-list-table">
                    <thead>
                        <tr>
                            <th>Friend list</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {friends.map(friend => (
                            <tr key={friend.id} className="friend-list-row">
                                <td>{friend.username}</td>
                                <td>
                                    <button 
                                        className="delete-button"
                                        onClick={() => deleteFriend(friend.username)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FriendList;
