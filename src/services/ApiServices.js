import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const apiService = {
    login: async (username, password) => {
        const response = await axios.get(`${API_BASE_URL}/users?username=${username}&password=${password}`);
        return response.data;
    },
    addReservation: async (username, phone, date, user_id, status) => {
        const response = await axios.post(`${API_BASE_URL}/orders`, {
            username: username,
            phone: phone,
            date: date,
            user_id: user_id,
            status: status
        });
        return response.data;
    },
    getAllReservationByUser: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/orders?user_id=${id}`);
        return response.data;
    }
};

export default apiService;
