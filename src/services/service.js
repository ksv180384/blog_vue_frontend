import store from "@/store/indexStore";
import api from "@/api";

export const loadPage = async (path, params) => {
    store.commit('setIsLoadingPage', true);
    const res = await api.get(path, { params: { ...params } });
    store.commit('setIsLoadingPage', false);
    return res;
}

export const getData = async (path, params) => {

    return await api.get(path, { params: { ...params } });
}

export const putData = async (path, params = {}, config = {}) => {
    return await api.put(path, params, config);
}

export const postData = async (path, params = {}, config = {}) => {
    return await api.post(path, params, config);
}