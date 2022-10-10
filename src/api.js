import axios from 'axios';
import router from "@/router/indexRouter";
import store from '@/store/indexStore';
import {actionIsAuth, initAuth, removeUserData} from "@/helpers";
import { refreshToken } from "@/services/user_service";

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

    initAuth(store, response?.data?.auth_data);

    return response.data;
}, async function (error) {
    // При ответе сервера с ошибкой

    // Если ошибка авторизации, то удаляем данные пользователя из localStorage
    if(error?.response?.status === 401){
        console.log(error.response.data);
        if(error.response.data.message === 'Unauthenticated.'){
            try {
                const resRefreshToken = await refreshToken();
                localStorage.setItem('token', resRefreshToken.access_token);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + resRefreshToken.access_token;
                return api.request(error.config);
            } catch (e) {
                removeUserData(store);
                api.defaults.headers.common['Authorization'] = '';
                console.log('error refresh');
                return api.request(error.config);
            }

            // return api.post('refresh').then(res => {
            //     localStorage.setItem('user_token', res.access_token);
            //     api.defaults.headers.common['Authorization'] = 'Bearer ' + res.access_token;
            //     return api.request(error.config);
            // }).catch((errorRefresh) => {
            //     localStorage.removeItem('user_token');
            //     api.defaults.headers.common['Authorization'] = '';
            //     return api.request(error.config);
            // });
        }
        router.push('/');
    }

    if(error?.response?.status !== 422){
        alert('error');
    }

    return Promise.reject(error);
});

export default api;