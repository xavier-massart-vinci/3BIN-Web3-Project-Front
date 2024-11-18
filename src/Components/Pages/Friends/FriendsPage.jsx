import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import FriendList from '../../Friend/FriendList';
import fetchFriends from '../../Friend/fetchFriends';
import FriendRequest from '../../Friend/FriendRequest';

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
