import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import FriendList from '../../FriendList/FriendList';
import fetchFriends from '../../FriendList/fetchFriends';
import FriendRequest from '../../FriendRequest/FriendRequest';

const FriendsPage = () => {
    const {setFriendList} = useOutletContext();

    useEffect(() => {
        // Fetch friends list when the page loads
        fetchFriends(setFriendList);
    }, [setFriendList]);

    return (
        <div>
            <FriendRequest />
            <FriendList />
        </div>
    );
};

export default FriendsPage;
