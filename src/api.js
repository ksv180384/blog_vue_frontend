import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/api/v1/',
    //baseURL: '/api/v1/',  // vue.config.js настроен путь для crossdomain
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': null,
        'X-Requested-With': null,
    }
});

api.interceptors.request.use(function (config){

    config.headers['Authorization'] = 'Bearer ' + (localStorage.getItem('user_token') ?? null);

    return config;
},
function (error){
    return Promise.reject(error);
});

// Обработка ответа сервера для всех заросов
api.interceptors.response.use(function (response) {
    // При положительном ответе сервера
    return response.data;
}, function (error) {
    // При ответе сервера с ошибкой
    alert('error');
    return Promise.reject(error);
});

export default api;