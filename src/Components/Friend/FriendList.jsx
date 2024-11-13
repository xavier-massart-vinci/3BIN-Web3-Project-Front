import axios from 'axios';
import fetchFriends from './fetchFriends'; // Import the fetchFriends function
import './FriendList.css';  // Import CSS for styling

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FriendList = ({ friends, setFriends }) => {

    // Function to delete a friend
    const deleteFriend = (friendUsername) => {
        axios.post(`${BASE_URL}/friends/deleteFriend`, {
            username: friendUsername // Only the username is needed here
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }

        })
            .then(response => {
                console.log('Friend added:', response.data);
                fetchFriends(setFriends);
            })
            .catch(error => console.error('Error deleting friend:', error));
    };

    return (
        <div className="friend-list-container">  
            <div className="friend-list-box">
            {friends.length === 0 ? (
                    <p className="no-friends-message">You don&apos;t have any friends</p>
                ) : (
                    <table className="friend-list-table">
                        <thead>
                            <tr>
                                <th>Friend List</th>
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
                )}
            </div>
        </div>
    );
};

export default FriendList;
