import axios from 'axios';
import config from '../../utlis/config'; // Update this path according to your project structure

// Function to fetch the friends list
const fetchFriends = async (setFriends) => {
    try {
        const response = await axios.get(`${config.BASE_URL}/friends/getFriends`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        setFriends(response.data);
    } catch (error) {
        console.error('Error fetching friends list:', error);
    }
};

export default fetchFriends;
