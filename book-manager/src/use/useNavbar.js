import {filterMenus} from "@/use/useMenu.js";
import {routes} from "@/router/router.js";

// 获取菜单的titles
export const getTitles = (path) => {
    // 获取菜单路由
    let menus = filterMenus(routes)
    // 拆分子菜单路由
    let menuList = [];
    splitMenus(menus, menuList);
    let menu = getMenuByPath(path, menuList)
    // 根据menu获取父menu(先获取一级父路由，后期：递归获取，手动多次调用获取)
    let parent = getParentMenu(menu, menus);

    let titles = []
    if(parent){
        titles.push(parent.meta.bookName);
    }
    titles.push(menu.meta.bookName);
    return titles;
}

// 拆分子菜单路由
export const splitMenus = (menus, menuList) => {
    for (let menu of menus) {
        if (!menu.children || !menu.children.length) {
            menuList.push(menu)
        } else {
            splitMenus(menu.children, menuList);
        }
    }
}

// 根据path，获取对应的menu
export const getMenuByPath = (path, menus) => {
    for (let menu of menus) {
        if (menu.meta?.path === path) {
            return menu
        }
    }
}

// 根据menu获取父menu
export const getParentMenu = (menu, menus) => {
    for (let menuItem of menus) {
        // debugger
        if (!menuItem.children) {
            continue
        }
        for (let childMenu of menuItem.children) {
            if(childMenu.path === menu.path){
                return menuItem;
            }
        }
        for (let childMenu of menuItem.children) {
            if(childMenu.children){
                getParentMenu(menu, childMenu.children);
            }
        }
    }
    return null;
}
