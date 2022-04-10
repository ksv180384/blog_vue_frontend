export default [
    {
        path: '/',
        name: 'IndexPage',
        component: () => import('@/pages/home/HomePage'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/post/:id',
        name: 'PostPage',
        component: () => import('@/pages/post/PostPage'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/post/create',
        name: 'CreatePostPage',
        component: () => import('@/pages/post/CreatePostPage'),
        meta: { layout: 'DefaultCommonLayout', auth: true },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/about/About'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login'),
        meta: { layout: 'AuthCommonLayout', auth: false },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import('@/pages/Registration'),
        meta: { layout: 'AuthCommonLayout', auth: false },
    },
];