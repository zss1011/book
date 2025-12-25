// 用户路由
export const userRoutes = {
    path: '/user/background',
    component: () => import('@/views/user/layout/Layout.vue'),
    meta: {menu: false, title: '用户后台', path: '/user/background'},
    redirect: '/user/background/leave/message',
    children: [
        {
            path: 'leave/message',
            component: () => import('@/views/user/leave-message/LeaveMessage.vue'),
            meta: {menu: true, title: '留言', icon: 'Notification', path: '/user/background/leave/message'},
        },
        {
            path: 'borrow',
            component: () => import('@/views/user/borrow/Borrow.vue'),
            meta: {menu: true, title: '借阅', icon: 'Notification', path: '/user/background/borrow'},
        },
        {
            path: 'subscription',
            component: () => import('@/views/user/subscription/Subscription.vue'),
            meta: {menu: true, title: '订阅', icon: 'Notification', path: '/user/background/subscription'},
        },
        {
            path: 'history',
            component: () => import('@/views/user/history/History.vue'),
            meta: {menu: true, title: '历史', icon: 'Notification', path: '/user/background/history'},
        },
        {
            path: 'collect',
            component: () => import('@/views/user/collect/Collect.vue'),
            meta: {menu: true, title: '收藏', icon: 'Icon收藏', path: '/user/background/collect'},
        },
        {
            path: 'notice',
            component: () => import('@/views/user/notice/Notice.vue'),
            meta: {menu: true, title: '公告', icon: 'Notification', path: '/user/background/notice'},
        },
        {
            path: 'log',
            component: () => import('@/views/user/log/Log.vue'),
            meta: {menu: true, title: '日志', icon: 'Notification', path: '/user/background/log'},
        },
        {
            path: 'message',
            component: () => import('@/views/user/message/Message.vue'),
            meta: {menu: true, title: '通知', icon: 'Notification', path: '/user/background/message'},
        },
        {
            path: 'info',
            component: () => import('@/views/user/user-info/UserInfo.vue'),
            meta: {menu: false, title: '用户信息', icon: 'Notification', path: '/user/background/info'},
        },
        {
            path: 'user/child',
            component: () => import('@/views/user/child/Child.vue'),
            meta: {menu: true, title: 'child', icon: 'Notification', path: '/user/background/user/child'},
            children: [
                {
                    path: 'child1',
                    component: () => import('@/views/user/child/Child1.vue'),
                    meta: {menu: true, title: 'child1', icon: 'Setting', path: '/user/background/user/child/child1'},
                },
                {
                    path: 'child2',
                    component: () => import('@/views/user/child/Child2.vue'),
                    meta: {menu: true, title: 'child2', icon: 'Clock', path: '/user/background/user/child/child2'},
                }
            ]
        },

    ]
}
