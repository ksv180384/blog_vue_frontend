
const storeHomePage = {
    namespaced: true,
    state: {
        posts: [],
        next_page: null,
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        pushPosts(state, posts) {
            state.posts = [...state.posts, ...posts];
        },
        setNextPage(state, next_page){
            state.next_page = next_page;
        },

    },
    actions: {},
    getters: {
        posts: state => state.posts,
        next_page: state => state.next_page,
    }
};

export default storeHomePage;

