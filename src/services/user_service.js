import {getData, loadPage, postData, putData} from "@/services/service";
import api from "@/api";

export const userLogin = async (params) => {
    return await postData('login', params);
}

export const userRegistration = async (params) => {
    return await postData('registration', params);
}

export const userLout = async () => {
    return await postData('logout');
}

export const profileEditPage = async () => {
    return await loadPage('user/profile/edit');
}

export const profileUpdate = async (params) => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     }
    // }
    return await postData('user/profile/update', params);
}

export const profilePage = async (id) => {
    return await loadPage(`user/${id}`);
}

export const refreshToken = async () => {
    return await postData('refresh');
}