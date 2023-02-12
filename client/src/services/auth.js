import axios from 'axios';
import config from './http-common';

class AuthService {
    login(data) {
        return axios.post(`/auth/login`, data, config());
    }

    logout() {
        return axios.get(`/logout`, config());
    }

    logoutAll() {
        return axios.get(`/logout/all`, config());
    }
}

export default new AuthService();
