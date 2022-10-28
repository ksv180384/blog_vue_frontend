import { getTopPostsNext, getTopPostsPage } from "@/services/post_service";

const storeTopPosts = {
    namespaced: true,
    state: () => {
        return {
            posts: [],
            next_page: null,
        }
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
    actions: {
        loadPosts: async (context) => {
            try {
                const resTopPost = await getTopPostsPage();
                context.commit('setPosts', resTopPost.posts.data);
                context.commit('setNextPage', resTopPost.posts.pagination.next_page);
            } catch (e) {
                console.log(e);
            }
        },
        loadPostsNext: async (context) => {
            try{
                const resPostsPage = await getTopPostsNext({ page: context.getters.next_page});
                context.commit('pushPosts', resPostsPage.posts.data);
                context.commit('setNextPage', resPostsPage.posts.pagination.next_page);
            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        posts: state => state.posts,
        next_page: state => state.next_page,
    }
};

export default storeTopPosts;

