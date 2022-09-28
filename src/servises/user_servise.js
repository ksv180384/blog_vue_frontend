import { postData } from "@/helpers";

export const userLogin = async (params) => {
    return await postData('login', params);
}

export const userLout = async () => {
    return await postData('logout');
}