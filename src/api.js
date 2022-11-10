import axios from 'axios';
import router from "@/router/indexRouter";
import store from '@/store/indexStore';
import { initAuth, getAuthToken, removeUserData } from "@/helpers";
import { refreshToken } from '@/services/user_service';

const base_URL =  process.env.VUE_APP_API_URL !== 'http://blog-vue.local'
    ?
    'http://localhost:8083/api/v1/'
    :
    process.env.VUE_APP_API_URL + '/api/v1/';

const api = axios.create({
    //baseURL: `${process.env.VUE_APP_API_URL}/api/v1/`,
    baseURL: base_URL,  // vue.config.js настроен путь для crossdomain
    //baseURL: 'http://localhost:8083/api/v1/',  // vue.config.js настроен путь для crossdomain
    //withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

api.interceptors.request.use(function (config){

    const token = getAuthToken();

    if(token){
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
},
function (error){
    return Promise.reject(error);
});

// Обработка ответа сервера для всех заросов
api.interceptors.response.use(async function (response) {
    // При положительном ответе сервера

    // Для обновления токена вторизации и выхода не перезависываем данные пользователя
    if(response.config.url !== 'refresh' && response.config.url !== 'logout'){
        // Если пользователь авторизован, а данные пользователя не пришли, то обновляем токен авторизации
        if(store.getters.auth && !response.data.auth_data && store.getters.remember){
            const resRefreshToken = await refreshToken();
            localStorage.setItem('token', resRefreshToken.access_token);
            api.defaults.headers.common['Authorization'] = 'Bearer ' + resRefreshToken.access_token;
            return api.request(response.config);
        }
        initAuth(store, response.data.auth_data);
    }

    return response.data;
}, async function (error) {
    // При ответе сервера с ошибкой

    // Если ошибка авторизации, то удаляем данные пользователя из localStorage
    if(error?.response?.status === 401){
        if(error.response.data.message === 'Unauthenticated.' && store.getters.remember){
            try {
                const resRefreshToken = await refreshToken();
                localStorage.setItem('token', resRefreshToken.access_token);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + resRefreshToken.access_token;
                //console.log('refresh');
                return api.request(error.config);
            } catch (e) {
                //console.log('refresh error');
                removeUserData(store);
                api.defaults.headers.common['Authorization'] = '';
                router.push('/');
                return Promise.reject(error);
            }
        }
        removeUserData(store);
        api.defaults.headers.common['Authorization'] = '';
        router.push('/');
        return Promise.reject(error);
    }

    if(error.config.method === 'get'){
        store.commit('setIsLoadingPage', false);
        router.push('/404');
    }

    if(error?.response?.status !== 422 && error.config.method !== 'get'){
        store.commit('setError', 'Ошибка. Попробуйте позже.');
        return Promise.reject(error);
    }

    return Promise.reject(error);
});

export default api;