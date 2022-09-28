import store from "@/store/indexStore";
import api from "@/api";

export const getUserData = () => {
    try{
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    } catch (e) {
        return null;
    }
}

export const loadPage = async (path, params) => {
    store.commit('setIsLoadingPage', true);
    const res = await api.get(path, { params: { ...params } });
    store.commit('setIsLoadingPage', false);
    return res;
}

export const getData = async (path, params) => {

    return await api.get(path, { params: { ...params } });
}

export const putData = async (path, params) => {
    return await api.put(path, params);
}

export const postData = async (path, params = {}) => {
    return await api.post(path, params);
}

export const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}