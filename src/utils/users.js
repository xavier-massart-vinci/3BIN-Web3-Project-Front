import axios from 'axios';

const fetchUsers = async (setUsersList) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });

        setUsersList(response.data);
    } catch (error) {
        console.error('Error fetching users list:', error);
    }
};

export default fetchUsers;