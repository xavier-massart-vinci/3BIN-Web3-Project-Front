import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import fetchFriends from './fetchFriends'; // Import the fetchFriends function
import './FriendList.css';  // Import CSS for styling

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FriendList = () => {
    const {friendList, setFriendList} = useOutletContext();

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
                fetchFriends(setFriendList);
            })
            .catch(error => console.error('Error deleting friend:', error));
    };

    return (
        <div className="friend-list-container">  
            <div className="friend-list-box">
            {friendList.length === 0 ? (
                    <p className="no-friends-message">Vous n&apos;avez pas d&apos;amis pour l&apos;instant</p>
                ) : (
                    <table className="friend-list-table">
                        <thead>
                            <tr>
                                <th>Liste d&apos;amis</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {friendList.map(friend => (
                                <tr key={friend.id} className="friend-list-row">
                                    <td>{friend.username}</td>
                                    <td>
                                        <button 
                                            className="fas fa-trash-alt"
                                            onClick={() => deleteFriend(friend.username)}
                                        >
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
