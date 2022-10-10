import { createStore } from 'vuex';
import { getUserData } from "@/helpers";

import storeHomePage from '@/pages/home/storeHome';
import storePostPage from '@/pages/post/storePost';

export default createStore({
  state () {
    return {
      auth: !!getUserData(),
      user: getUserData(),
      is_loading_page: false,
      show_sidebar: false,
      show_registration: false,
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setUser(state, user) {
      state.user = user;
    },
    sidebarToggle(state) {
      state.show_sidebar = !state.show_sidebar;
    },
    registrationToggle(state) {
      state.show_registration = !state.show_registration;
    },
    sidebarHide(state) {
      state.show_sidebar = false;
    },
    setIsLoadingPage(state, val){
      state.is_loading_page = val;
    }
  },
  getters: {
    auth: state => state.auth,
    user: state => state.user,
    menu_top: state => state.menu_top,
    show_sidebar: state => state.show_sidebar,
    show_registration: state => state.show_registration,
    is_loading_page: state => state.is_loading_page,
  },
  modules: {
    storeHomePage: storeHomePage,
    storePostPage: storePostPage
  },
});
