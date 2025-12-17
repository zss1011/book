// 获取菜单路由
export const filterMenus = (routes) => {
    const menus = dupFilterMenus(routes);

    // 获取users中的所有路由
    let userRouters = getUserRouters(routes);
    let userPaths = []
    for (let userRouter of userRouters) {
        userPaths.push(userRouter.meta.path);
    }

    // 获取child中titles
    const childTitles = [];
    for (let menu of menus) {
        if (!menu.children) {
            continue;
        }
        childTitles.push(...dupGetTitles(menu.children));
    }

    // 过滤child中titles
    return menus.filter(menu => !childTitles.includes(menu.meta.title) && !userPaths.includes(menu.meta.path));
}

// 获取users中的所有路由
const getUserRouters = (routes) => {
    let userRouter = null;
    for (let route of routes) {
        if (route.path === '/user/background') {
            userRouter = route
            break
        }
    }
    // 递归获取userRouters中的所有path
    let userRouters = dupGetUserRouters(userRouter);
    return userRouters;
}

// 递归获取userRouters中的所有path
const dupGetUserRouters = (route) => {
    const result = [];

    // 先收集当前路由
    result.push(route);

    // 再递归 children
    if (route.children && route.children.length > 0) {
        for (let child of route.children) {
            const childRoutes = dupGetUserRouters(child);
            result.push(...childRoutes);  // ✅ 核心：展开
        }
    }

    return result;
}


// 获取所有title
export const dupGetTitles = (routes) => {
    const titles = [];
    for (let route of routes) {
        if (!route.children) {
            titles.push(route.meta?.title);
        } else {
            titles.push(...dupGetTitles(route.children))
        }
    }
    return titles;
}

// 递归获取所有菜单
export const dupFilterMenus = (routes) => {
    const menus = []
    for (const route of routes) {
        if (!route) {
            continue
        }
        if (route.meta?.menu === true) {
            menus.push(route)
        }
        if (route.children && route.children.length > 0) {
            const res = dupFilterMenus(route.children);
            menus.push(...res)
        }
    }
    return menus
}
