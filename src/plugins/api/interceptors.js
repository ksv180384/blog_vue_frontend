import { getAuthToken, initAuth, removeUserData } from "@/helpers";
import store from "@/store/indexStore";
import { refreshToken } from "@/services/user_service";
import router from "@/router/indexRouter";

export default function (api){
    api.interceptors.request.use(function (config){
            return setRequestParams(config);
        },
        function (error){
            return Promise.reject(error);
        });

    // Обработка ответа сервера для всех заросов
    api.interceptors.response.use(async function (response) {
        // При положительном ответе сервера
        return processingSuccessResponse(api, response);
    },
        async function (error) {
        // При ответе сервера с ошибкой
        return processingErrorResponse(api, error);
    });
}

// Задаем данные запроса
const setRequestParams = (config) => {
    const token = getAuthToken();
    if(token){
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}

// Обрабатываем данные положительного ответа
const processingSuccessResponse = async (api, response) => {
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
}

// Обрабатываем данные ответа с ошибкой
const processingErrorResponse = async (api, error) => {
    // Если ошибка авторизации, то удаляем данные пользователя из localStorage
    if(error?.response?.status === 401){
        // Но если ошибка авторизации и авторизация с галочкой "запомнить", то обновляем токен
        if(error.response.data.message === 'Unauthenticated.' && store.getters.remember){
            try {
                // Пробуем обновить токен авторизации
                const resRefreshToken = await refreshToken();
                localStorage.setItem('token', resRefreshToken.access_token);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + resRefreshToken.access_token;
                return api.request(error.config); // Повторный запрос с ообновленным токеном
            } catch (e) {
                // При невозможности обновить токен, затираем данные авторизации и редирект на главную
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

    // Если запрос типа get вернул ошибку, то скрываем прелоадер и редирект на страницу с ошибкой
    if(error.config.method === 'get'){
        store.commit('setIsLoadingPage', false);
        router.push('/404');
    }

    if(error?.response?.status !== 422 && error.config.method !== 'get'){
        store.commit('setError', 'Ошибка. Попробуйте позже.');
        return Promise.reject(error);
    }

    return Promise.reject(error);
}