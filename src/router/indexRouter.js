import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/indexStore';

// routes
import routeCommon from '@/pages/routesCommon';

const routes = [
    ...routeCommon,
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        return savedPosition ||
               {
                   top: to.meta?.scrollTop || 0,
                   left: 0
               }
    },
});

router.beforeEach((to, from, next) => {
    // Сохраняем позицию скролла на текущей странице (только для главной страницы)
    from.matched.some(record => {
        if(record.name === 'IndexPage'){
            record.meta.scrollTop = window.pageYOffset;
        }
    });

    store.commit('sidebarHide');
    store.commit('storePostPage/setPost', null);
    store.commit('storePostPage/setPostComments', null);

    // Проверка доступа не авторизовнным пользователям
    const userAuth = !!localStorage.getItem('user');
    const requestAuth = to.matched.some(record => record.meta.auth);

    if(requestAuth && !userAuth){
        next('/');
    }else{
        next();
    }
});


export default router;
