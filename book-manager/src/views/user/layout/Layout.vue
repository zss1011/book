<template>
    <div class="layout-container">
        <div class="sidebar">
            <Sidebar />
        </div>
        <div class="main-content">
            <MainContent />
        </div>
        <div class="user-avatar">
            <UserAvatar />
        </div>
    </div>
</template>

<script setup lang="js">
import Sidebar from "@/views/user/layout/Sidebar.vue";
import MainContent from "@/views/user/layout/MainContent.vue";
import UserAvatar from "@/views/user/layout/UserAvatar.vue";
</script>

<style scoped lang="scss">
.layout-container {
    display: flex;
    position: relative;

    .sidebar {
        min-width: 12vw;
        height: 100vh;
        background-color: rgb(226, 228, 229);
    }

    .main-content {
        height: 100vh;
        flex-grow: 1;
    }

    .user-avatar {
        width: 300px;
        height: 60px;
        position: absolute;
        right: 20px;
        top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 30px;
        box-sizing: border-box;
    }
}
</style>
