import { getMyPostsNext, getMyPostsPage } from "@/services/post_service";

const storeMyPosts = {
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
        loadMyPosts: async (context) => {
            try {
                const resMyPostsPage = await getMyPostsPage();
                context.commit('setPosts', resMyPostsPage.posts.data);
                context.commit('setNextPage', resMyPostsPage.posts.pagination.next_page);
            } catch (e) {
                console.log(e);
            }
        },
        loadPostsNext: async (context) => {
            try{
                const resMyPostsNext = await getMyPostsNext({ page: context.getters.next_page });
                context.commit('pushPosts', resMyPostsNext.posts.data);
                context.commit('setNextPage', resMyPostsNext.posts.pagination.next_page);
            } catch (e) {
                console.log(e);
            }
        }
    },
    getters: {
        posts: state => state.posts,
        next_page: state => state.next_page,
    }
};

export default storeMyPosts;

