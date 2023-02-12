import axios from 'axios';
import config from './http-common';

class AuthService {
    login(data) {
        return axios.post(`/auth/login`, data, config());
    }
}

export default new AuthService();
