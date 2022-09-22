import { loadPage, getData } from "@/helpers";

export const getPostsPage = async () => {
    return  await loadPage('/', {});
}

export const getPostsNext = async (params) => {
    return  await getData('/', params);
}



// async loadIndexPage({ commit, state }){
//     commit('setIsLoadMore', true);
//
//     const res = await api.get('/', {params: { page: state.next_page}});
//     commit('setPosts', res.posts);
//     commit('setIsLoadMore', false);
// }