import axios from 'axios';

const api = axios.create({
    baseURL: 'https://hapx-apigw.nvizible.co.za/1.0.0/apig/configuration/',
});

export default api;