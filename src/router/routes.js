const routes = [

    {
        name: 'home',
        path: '/',
        component: () => import('../pages/Home.vue')
    },
    {
        name: 'account',
        path: '/account',
        component: () => import('../pages/Account.vue'),
        meta: { requiresAuth: true }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('../pages/auth/Login.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: () => import('../pages/auth/Register.vue')
    },
    {
        name: 'recover',
        path: '/recover',
        component: () => import('../pages/auth/Recover.vue')
    },
    {
        name: 'recoverPwd',
        path: '/recover/password',
        component: () => import('../pages/auth/Password.vue')
    }

]

export default routes