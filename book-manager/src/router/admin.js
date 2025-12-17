// 管理员后台路由
export const adminRoutes = {
    path: '/',
    component: () => import('@/views/admin/layout/Layout.vue'),
    meta: {menu: false},
    redirect: '/dash/board',
    children: [
        {
            path: 'dash/board',
            component: () => import('@/views/admin/dash-board/DashBoard.vue'),
            meta: {menu: true, title: '仪表盘', icon: 'Notification', path: '/dash/board'},
        },
        {
            path: 'user',
            component: () => import('@/views/admin/user/User.vue'),
            meta: {menu: true, title: '用户管理', icon: 'plus', path: '/user'}
        },
        {
            path: 'book',
            component: () => import('@/views/admin/book/Book.vue'),
            meta: {menu: true, title: '书籍管理', icon: 'Connection', path: '/book'}
        },
        {
            path: 'book-type',
            component: () => import('@/views/admin/book-type/bookType.vue'),
            meta: {menu: true, title: '书籍类别', icon: 'Notebook', path: '/book-type'}
        },
        {
            path: 'bookrack',
            component: () => import('@/views/admin/bookrack/bookrack.vue'),
            meta: {menu: true, title: '书架配置', icon: 'List', path: '/bookrack'}
        },
        {
            path: 'notice',
            component: () => import('@/views/admin/notice/Notice.vue'),
            meta: {menu: true, title: '公告管理', icon: 'Notification', path: '/notice'},
        },
        {
            path: 'notice/add',
            component: () => import('@/views/admin/notice/AddNotice.vue'),
            meta: {menu: false, title: '公告管理', path: '/notice/add'},
        },
        {
            path: 'leave/message',
            component: () => import('@/views/admin/leave-message/LeaveMessage.vue'),
            meta: {menu: true, title: '留言', icon: 'Notification', path: '/leave/message'},
        },
        {
            path: 'child',
            component: () => import('@/views/admin/child/Child.vue'),
            meta: {menu: true, title: 'child', icon: 'ChatDotRound', path: '/child'},
            redirect: '/child/child1',
            children: [
                {
                    path: 'child1',
                    component: () => import('@/views/admin/child/Child1.vue'),
                    meta: {menu: true, title: 'child1', icon: 'Setting', path: '/child/child1'},
                },
                {
                    path: 'child2',
                    component: () => import('@/views/admin/child/Child2.vue'),
                    meta: {menu: true, title: 'child2', icon: 'Clock', path: '/child/child2'},
                }
            ]
        }
    ]
}
