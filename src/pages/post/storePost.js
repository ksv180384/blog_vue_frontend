
const storePostPage = {
    namespaced: true,
    state: () => {
        return {
            post: null,
            comments: null,
        }
    },
    mutations: {
        setPost(state, post) {
            state.post = post;
        },
        setPostComments(state, comments) {
            state.comments = comments;
        },
    },
    getters: {
        post: state => state.post,
        comments: state => state.comments,
    }
};

export default storePostPage;