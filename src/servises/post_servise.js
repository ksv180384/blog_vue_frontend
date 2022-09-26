import api from "@/api";
import {loadPage, getData, putData} from "@/helpers";

export const getPostsPage = async () => {
    return  await loadPage('/', {});
}

export const getPostsNext = async (params) => {
    return  await getData('/', params);
}

export const postUp = async (id) => {
    return await putData('post/up', { id: id })
}

export const postDown = async (id) => {
    return await putData('post/down', { id: id })
}

// async loadIndexPage({ commit, state }){
//     commit('setIsLoadMore', true);
//
//     const res = await api.get('/', {params: { page: state.next_page}});
//     commit('setPosts', res.posts);
//     commit('setIsLoadMore', false);
// }