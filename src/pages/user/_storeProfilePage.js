import { profilePage } from "@/services/user_service";

const storeProfilePage = {
    namespaced: true,
    state: () => {
        return {
            name: '',
            avatar: '',
            about: '',
        }
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        setAvatar(state, avatar){
            state.avatar = avatar;
        },
        setAbout(state, about){
            state.about = about;
        },

    },
    actions: {
        loaDataPage: async (context, id) => {
            try {
                const resProfilePage = await profilePage(id);
                const user = resProfilePage.user;
                context.commit('setName', user.name);
                context.commit('setAvatar', user.avatar);
                context.commit('setAbout', user.about);
                return resProfilePage;
            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        name: state => state.name,
        avatar: state => state.avatar,
        about: state => state.about,
    }
};

export default storeProfilePage;

