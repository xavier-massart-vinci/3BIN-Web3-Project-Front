import { useEffect } from 'react';
import { useOutletContext } from "react-router-dom";
import FriendList from '../../FriendList/FriendList';
import FriendRequest from '../../FriendRequest/FriendRequest';
import fetchFriends from '../../../utils/friends';

const FriendsPage = () => {
    const {setFriendList} = useOutletContext();

    useEffect(() => {
        fetchFriends(setFriendList);
    }, []);

    return (
        <div>
            <FriendRequest />
            <FriendList />
        </div>
    );
};

export default FriendsPage;
