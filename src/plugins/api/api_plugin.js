import axios from 'axios';
import interceptors from './interceptors';

const base_URL =  process.env.VUE_APP_API_URL !== 'http://blog-vue.local'
    ?
    'http://localhost:8083/api/v1/'
    :
    process.env.VUE_APP_API_URL + '/api/v1/';

const api = axios.create({
    baseURL: base_URL,  // vue.config.js настроен путь для crossdomain
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

interceptors(api);

export default api;