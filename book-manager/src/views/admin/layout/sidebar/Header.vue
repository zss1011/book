<template>
    <div class="header-container">
        <span>
            <MySvg  style="width: 36px; height: 36px; margin-top: 2px; vertical-align:middle;"/>
        </span>
        <span style="transform: translateY(5px); font-size: 24px; font-weight: bolder">图书后台</span>
    </div>
</template>

<script setup lang="js">
import MySvg from '@/svg/我的学习.svg'
</script>

<style scoped lang="scss">
.header-container{
    display: flex;
    justify-content: center;
    padding-top: 20px;
    box-sizing: border-box;
    gap: 5px;
}
</style>
