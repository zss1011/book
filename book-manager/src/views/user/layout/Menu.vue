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

const menus = userRoutes.children
</script>

<style scoped lang="scss">

:deep(.el-menu) {
    border-right: none;
}
</style>
