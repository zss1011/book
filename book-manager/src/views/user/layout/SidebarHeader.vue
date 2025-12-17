<template>
    <div class="sidebar-header-container">
        <span>
            <MySvg style="width: 36px; height: 36px; margin-top: 2px; vertical-align:middle;" />
        </span>
        <span>图书管理系统</span>
    </div>
</template>

<script setup lang="js">
import MySvg from "@/svg/我的学习.svg";
</script>

<style scoped lang="scss">
.sidebar-header-container {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: bolder;
}
</style>
