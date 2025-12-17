<template>
  <div id="app">
    <router-view></router-view>
      <div>111</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>
html, body, #app {
    width: 100vw;
    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    text-align: center;
}
</style>
