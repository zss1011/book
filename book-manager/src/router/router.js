import {createRouter, createWebHistory} from 'vue-router'
import {adminRoutes} from "@/router/admin.js";
import {userRoutes} from "@/router/user.js";

export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue'),
        meta: {menu: false},
    },
    {
        path: '/register',
        component: () => import('@/views/login/Register.vue'),
        meta: {menu: false},
    },
    {
        path: '/notice/detail',
        component: () => import('@/views/admin/notice/NoticeDetail.vue'),
        meta: {menu: false, title: '公告管理', path: '/notice/detail'},
    }
]

routes.push(adminRoutes)
routes.push(userRoutes)

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router
