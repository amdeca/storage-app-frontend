import axios from 'axios';

const api = axios.create({
    baseURL: "https://node-storage-app.herokuapp.com",
});

export default api;
