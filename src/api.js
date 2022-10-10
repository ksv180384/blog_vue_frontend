import axios from 'axios';
import router from "@/router/indexRouter";
import store from '@/store/indexStore';
import {removeLocalStorageUserData} from "@/helpers";

const api = axios.create({
    //baseURL: `${process.env.VUE_APP_API_URL}/api/v1/`,
    baseURL: '/api/v1/',  // vue.config.js настроен путь для crossdomain
    //withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Cache-Control': null,
        //'X-Requested-With': null,
    }
});

api.interceptors.request.use(function (config){

    //const user = getUserData();
    const token = localStorage.getItem('token');

    config.headers['Authorization'] = 'Bearer ' + token;

    return config;
},
function (error){
    return Promise.reject(error);
});

// Обработка ответа сервера для всех заросов
api.interceptors.response.use(function (response) {
    // При положительном ответе сервера

    if(response?.data?.auth_data){
        store.commit('setAuth', true);
        store.commit('setUser', response.data.auth_data);
    }
    return response.data;
}, function (error) {
    // При ответе сервера с ошибкой

    // Если ошибка авторизации, то удаляем данные пользователя из localStorage
    if(error?.response?.status === 401){
        store.commit('setAuth', false);
        store.commit('setUser', null);
        removeLocalStorageUserData();
        router.push('/');
    }

    if(error?.response?.status !== 422){
        alert('error');
    }

    return Promise.reject(error);
});

export default api;