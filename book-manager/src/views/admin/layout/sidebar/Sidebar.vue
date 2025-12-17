<template>
    <div class="sidebar-container">
        <Header class="header"></Header>
        <Menu class="menu"></Menu>
    </div>
</template>

<script setup lang="js">
import Header from "@/views/admin/layout/sidebar/Header.vue";
import Menu from "@/views/admin/layout/sidebar/Menu.vue";
</script>

<style scoped lang="scss">
.sidebar-container {
    display: flex;
    flex-direction: column;

    .header {
        width: 100%;
        height: 80px;
    }

    .menu {
        flex-grow: 1;
    }
}

:deep(.el-menu) {
    border-right: none;
}
</style>
