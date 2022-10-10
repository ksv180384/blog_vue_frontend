import {getData, postData, putData} from "@/services/service";
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

export const profileEdit = async () => {
    return await getData('user/profile/edit');
}

export const profileUpdate = async (params) => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     }
    // }
    return await postData('user/profile/update', params, config);
}

export const profile = async (id) => {
    return await getData(`user/${id}`);
}

export const refreshToken = async () => {
    return await postData('refresh');
}