import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/indexStore';

// routes
import commonRoute from '@/router/common.routes';

const routes = [
    ...commonRoute,
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: to.meta?.top || 0
            }
        }
        return savedPosition ||
               {
                   top: to.meta?.scrollTop || 0,
                   left: 0
               }
    },
});

router.beforeEach( (to, from, next) => {
    // Сохраняем позицию скролла на текущей странице (только для главной страницы)
    from.matched.some(record => {
        if(record.name === 'HomePage'){
            record.meta.scrollTop = window.scrollY;
        }
    });

    store.commit('sidebarHide');
    store.commit('storePostPage/setPost', null);
    store.commit('storePostPage/setPostComments', null);

    // Проверка доступа не авторизовнным пользователям
    const userAuth = store.getters.auth; //!!localStorage.getItem('user');
    const requestAuth = to.matched.some(record => record.meta.auth);

    if(requestAuth && !userAuth){
        next('/');
    }else{
        next();
    }
});


export default router;
