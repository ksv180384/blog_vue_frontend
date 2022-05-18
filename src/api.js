import axios from 'axios';
import router from "@/router/indexRouter";

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

    const user =  localStorage.getItem('user');
    const token = user ? JSON.parse(user).token : null

    config.headers['Authorization'] = 'Bearer ' + token;

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

    // Если ошибка авторизации, то удаляем данные пользователя из localStorage
    if(error.response.status === 403){
        localStorage.removeItem('user');
        router.push('/');
    }

    alert('error');
    return Promise.reject(error);
});

export default api;