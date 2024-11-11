import { useState, useEffect } from 'react';
import FriendList from '../../Friend/FriendList';
import AddFriend from '../../Friend/AddFriends';
import fetchFriends from '../../Friend/fetchFriends';

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // Fetch friends list when the page loads
        fetchFriends(setFriends);
    }, []);

    return (
        <div>
            <AddFriend setFriends={setFriends} />
            <FriendList friends={friends} setFriends={setFriends} />
        </div>
    );
};

export default FriendsPage;
