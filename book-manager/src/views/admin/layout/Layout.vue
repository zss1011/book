<template>
    <div class="layout-container">
        <Sidebar class="sidebar"></Sidebar>
        <div class="main">
            <Navbar class="navbar"></Navbar>
            <MainContent class="main-content"></MainContent>
        </div>
    </div>
</template>

<script setup lang="js">
import Navbar from "@/views/admin/layout/navbar/Navbar.vue";
import Sidebar from "@/views/admin/layout/sidebar/Sidebar.vue";
import MainContent from "@/views/admin/layout/main-content/MainContent.vue";
</script>

<style scoped lang="scss">
.layout-container {
    width: 100%;
    height: 100%;
    display: flex;

    .sidebar {
        background: rgb(226, 228, 229);
        width: 260px;
        min-width: 260px;
        height: 100%;
    }

    .main {
        display: flex;
        flex-direction: column;
        background: aquamarine;
        flex-grow: 1;

        .navbar {
            width: 100%;
            height: 80px;
            background: rgb(242, 244, 245);
            min-height: 80px;
        }

        .main-content {
            flex-grow: 1;
            background: rgb(255, 255, 255);
        }
    }
}

</style>
