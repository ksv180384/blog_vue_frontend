export default [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('@/pages/home/HomePage'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/posts/top',
        name: 'TopPosts',
        component: () => import('@/pages/post/TopPostsPage'),
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
        component: () => import('@/pages/about/AboutPage'),
        meta: { layout: 'DefaultCommonLayout', auth: false, top: 80 },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginPage'),
        meta: { layout: 'AuthCommonLayout', auth: false },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import('@/pages/RegistrationPage'),
        meta: { layout: 'AuthCommonLayout', auth: false },
    },
    {
        path: '/user/:id',
        name: 'Profile',
        component: () => import('@/pages/user/ProfilePage'),
        meta: { layout: 'DefaultCommonLayout', auth: false },
    },
    {
        path: '/user/profile',
        name: 'ProfileEdit',
        component: () => import('@/pages/user/ProfileEditPage'),
        meta: { layout: 'DefaultCommonLayout', auth: true },
    },
    {
        path: '/user/my-posts',
        name: 'MyPosts',
        component: () => import('@/pages/user/MyPostsPage'),
        meta: { layout: 'DefaultCommonLayout', auth: true },
    },
    {
        path: '/404',
        component: () => import('@/pages/404Page'),
        meta: { layout: 'ErrorLayout', auth: false },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/404Page'),
        meta: { layout: 'ErrorLayout', auth: false },
    },
];