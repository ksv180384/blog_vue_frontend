import api from '@/api';

export default {
    state: {
        posts: [],
        next_page: 1,
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = [...state.posts, ...posts.data];
            state.next_page = posts.pagination.next_page;
        },
    },
    actions: {
         loadIndexPage({ commit, state }){
            api.get('/', {params: { page: state.next_page}})
                .then(response => {
                    commit('setPosts', response.posts);
                    commit('setAuth', !!response.user);
                    commit('setUser', response.user);
                });
        }
    },
    getters: {
        posts: state => state.posts,
        next_page: state => state.next_page,
    }
};

