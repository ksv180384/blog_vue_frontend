import { createStore } from 'vuex';
import menu from './menu';

import storeHomePage from '@/pages/home/storeHome';
import storePostPage from '@/pages/post/storePost';

export default createStore({
  state: {
    auth: !!localStorage.getItem('user'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    is_loading_page: false,
    show_sidebar: false,
    show_registration: false,
    menu_top: menu,
  },
  mutations: {
    setAuth(state, auth) {
      /*
      if(auth === false){
        localStorage.removeItem('user_token');
      }
      */
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
  actions: {

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
