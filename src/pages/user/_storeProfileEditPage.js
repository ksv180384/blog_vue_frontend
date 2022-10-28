import { profileEditPage } from "@/services/user_service";

const storeProfileEditPage = {
    namespaced: true,
    state: () => {
        return {
            email: '',
            name: '',
            avatar: '',
            about: '',
        }
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
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
        loaDataPage: async (context) => {
            try {
                const resProfileEdit = await profileEditPage();
                const user = resProfileEdit.user;
                context.commit('setEmail', user.email);
                context.commit('setName', user.name);
                context.commit('setAvatar', user.avatar);
                context.commit('setAbout', user.about);
                return resProfileEdit;
            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        email: state => state.email,
        name: state => state.name,
        avatar: state => state.avatar,
        about: state => state.about,
    }
};

export default storeProfileEditPage;

