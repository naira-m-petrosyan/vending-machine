import axios from 'axios';
import config from './http-common';

class ProductService {
    getProducts() {
        return axios.get(`/product`, config());
    }

    getProduct(data) {
        return axios.get(`/product/${data.id}`, config());
    }

    createProduct(data) {
        return axios.post(`/product`, data, config());
    }

    updateProduct(data) {
        return axios.put(`/product/${data.id}`, data, config());
    }

    deleteProduct(data) {
        return axios.delete(`/product/${data.id}`, config());
    }

    buyProduct(data) {
        return axios.post(`/product/${data.id}/buy`, data, config());
    }
}

export default new ProductService();
