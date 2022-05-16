import api from '@/api';

export default {
    state: {
        post: null,
        comments: null,
    },
    mutations: {
        setPost(state, post) {
            state.post = post;
        },
        setPostComments(state, comments) {
            state.comments = comments;
        },
    },
    actions: {
        loadPost({ commit }, id){
            api.get('post/' + id)
                .then(response => {
                    commit('setPost', response.post);
                    commit('setPostComments', response.comments);
                })
        },
    },
    getters: {
        post: state => state.post,
        comments: state => state.comments,
    }
};