<template>
    <div class="sidebar-container">
        <el-menu class="el-menu" mode="vertical" background-color="rgb(226, 228, 229">
            <SubMenu v-model:menus="menus" />
        </el-menu>
    </div>
</template>

<script setup lang="js">
import {userRoutes} from "@/router/user.js";
import SubMenu from "@/views/user/layout/SubMenu.vue";

let menus = userRoutes.children
// 过滤菜单
const filterMenus = (routes) => {
    const result = []
    for (let route of routes) {
        const keep = route?.meta?.menu
        if (!keep) continue;
        const newRoute = {...route}
        const children = route.children;
        if (Array.isArray(children) && children.length > 0) {
            const res = filterMenus(children);
            newRoute.children = res;
        }
        result.push(newRoute)
    }
    return result;
}
menus = filterMenus(menus)

</script>

<style scoped lang="scss">

:deep(.el-menu) {
    border-right: none;
}
</style>
