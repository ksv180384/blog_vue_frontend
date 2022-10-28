import {getPost} from "@/services/post_service";

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
    actions:{
        loadPost: async (context, id) => {
            try {
                const resGetPost = await getPost(id);
                context.commit('setPost', resGetPost.post);
                context.commit('setPostComments', resGetPost.comments);
                return resGetPost;
            } catch (e) {
                console.log(e);
                //responseErrorNote(e);
            }
        },
    },
    getters: {
        post: state => state.post,
        comments: state => state.comments,
    }
};

export default storePostPage;