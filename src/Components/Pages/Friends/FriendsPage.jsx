import { useState, useEffect } from 'react';
import FriendList from '../../Friend/FriendList'; // Import FriendList component
import AddFriend from '../../Friend/AddFriends';   // Import AddFriend component
import fetchFriends from '../../Friend/fetchFriends'; // Import fetchFriends utility

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch friends list when the page loads
        fetchFriends(setFriends);
    }, []);

    return (
        <div>
            <AddFriend setFriends={setFriends} /> {/* Pass setFriends to AddFriend */}
            <FriendList friends={friends} setFriends={setFriends} /> {/* Pass both friends and setFriends to FriendList */}
        </div>
    );
};

export default FriendsPage;
