import axios from 'axios';
import config from './http-common';

class UserService {
    createUser(data) {
        return axios.post(`/user`, data,  config());
    }
    
    updateDeposit(data) {
        return axios.patch(`/user/deposit`, data, config());
    }

    resetDeposit(data) {
        return axios.patch(`/user/reset-deposit`, data, config());
    }

    getLoggedUser() {
        return axios.get(`/user`, config());
    }
}

export default new UserService();
