<template>
    <div class="menu-container">
        <el-menu class="el-menu" mode="vertical" background-color="rgb(226, 228, 229">
            <SubMenu v-model:menus="menus" />
        </el-menu>
    </div>
</template>

<script setup lang="js">
import {routes} from "@/router/router.js";
import SubMenu from "@/views/admin/layout/sidebar/SubMenu.vue";
import {filterMenus} from "@/use/useMenu.js";

// 获取菜单路由
let menus = filterMenus(routes);
console.log(menus)
</script>

<style scoped lang="scss">
</style>
