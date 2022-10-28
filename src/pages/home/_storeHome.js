import {getPostsNext, getPostsPage} from '@/services/post_service';

const storeHomePage = {
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
            if(context.getters.posts.length) return;
            try{
                const resPostsPage = await getPostsPage();
                context.commit('setPosts', resPostsPage.posts.data);
                context.commit('setNextPage', resPostsPage.posts.pagination.next_page);
            } catch (e) {
                console.log(e);
            }
        },
        loadPostsNext: async (context) => {
            try{
                const resPostsPage = await getPostsNext({ page: context.getters.next_page});
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

export default storeHomePage;

