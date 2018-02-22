import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ef4cd.firebaseio.com/'
});

export default instance;