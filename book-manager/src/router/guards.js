import router from '@/router/router.js'

// 路由守卫
export const registerGuards = () => {
    router.beforeEach((to, from) => {
        if (to.path === '/login' || to.path === '/register') {
            return true
        }
        const token = sessionStorage.getItem('token');
        if (!token) {
            return {path: '/login'}
        }
        return true
    })
}

