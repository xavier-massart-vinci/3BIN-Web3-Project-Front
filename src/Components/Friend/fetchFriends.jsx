import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Function to fetch the friends list
const fetchFriends = async (setFriendList) => {
    try {
        const response = await axios.get(`${BASE_URL}/friends/getFriends`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        setFriendList(response.data);
    } catch (error) {
        console.error('Error fetching friends list:', error);
    }
};

export default fetchFriends;
