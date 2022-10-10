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
    {
        path: '/user/:id',
        name: 'Profile',
        component: () => import('@/pages/user/Profile'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/user/profile',
        name: 'ProfileEdit',
        component: () => import('@/pages/user/ProfileEdit'),
        meta: { layout: 'DefaultCommonLayout', auth: true },
    },
    {
        path: '/user/my-posts',
        name: 'MyPosts',
        component: () => import('@/pages/user/MyPosts'),
        meta: { layout: 'DefaultCommonLayout', auth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/404'),
        meta: { layout: 'ErrorLayout', auth: false },
    },
];