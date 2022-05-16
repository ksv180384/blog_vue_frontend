import api from '@/api';

export default {
    state: {
        posts: [],
        next_page: 1,
        isLoadingMore: false,
        canLoadMore: true,
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = [...state.posts, ...posts.data];
            state.next_page = posts.pagination.next_page;
            state.total_pages = posts.pagination.total_pages;
            state.canLoadMore = posts.pagination.next_page !== null;
        },
        setIsLoadMore(state, val){
            state.isLoadingMore = val;
        }
    },
    actions: {
         async loadIndexPage({ commit, state }){
             commit('setIsLoadMore', true);

             const res = await api.get('/', {params: { page: state.next_page}});
             commit('setPosts', res.posts);
             commit('setIsLoadMore', false);
        }
    },
    getters: {
        posts: state => state.posts,
        next_page: state => state.next_page,
        isLoadingMore: state => state.isLoadingMore,
        canLoadMore: state => state.canLoadMore,
    }
};

