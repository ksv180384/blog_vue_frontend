import { createStore } from 'vuex';
import { getUserData } from "@/helpers";

import storeHomePage from '@/pages/home/_storeHome';
import storePostPage from '@/pages/post/_storePostPage';
import storeTopPostsPage from '@/pages/post/_storeTopPostsPage';
import storeMyPostsPage from '@/pages/user/_storeMyPostsPage';
import storeProfileEditPage from '@/pages/user/_storeProfileEditPage';
import storeProfilePage from '@/pages/user/_storeProfilePage';

const timeout = null;

export default createStore({
  state () {
    return {
      auth: !!getUserData(),
      user: getUserData(),
      remember: localStorage.getItem('remember'),
      is_loading_page: false,
      show_sidebar: false,
      show_registration: false,
      error: '',
      timer: null
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setUser(state, user) {
      state.user = user;
    },
    setRemember(state, remember) {
      state.remember = remember;
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
    },
    setError(state, val){
      state.error = val;
      clearTimeout(state.timer);
      state.timer = setTimeout(() => state.error = '', 5000);
    }
  },
  getters: {
    auth: state => state.auth,
    user: state => state.user,
    remember: state => state.remember,
    menu_top: state => state.menu_top,
    show_sidebar: state => state.show_sidebar,
    show_registration: state => state.show_registration,
    is_loading_page: state => state.is_loading_page,
    error: state => state.error,
  },
  modules: {
    storeHomePage: storeHomePage,
    storePostPage: storePostPage,
    storeTopPostsPage: storeTopPostsPage,
    storeMyPostsPage: storeMyPostsPage,
    storeProfileEditPage: storeProfileEditPage,
    storeProfilePage: storeProfilePage,
  },
});
