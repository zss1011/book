<template>
    <div class="user-avatar-container">
        <el-dropdown>
            <div class="avatar">
                <el-avatar class="avatar-img" :src="previewUrl" />
                <span class="realName">{{ realName }}</span>
            </div>
            <template #dropdown>
                <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="js">

// 获取当前用户信息并缓存
import {onMounted, ref} from "vue";
import {currentUserApi} from "@/api/userApi.js";
import {useUserStore} from "@/store/useUserStore.js";
import {downloadFileApi} from "@/api/fileApi.js"
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()

const realName = ref('');
const previewUrl = ref('')
onMounted(async () => {
    const {data} = await currentUserApi();
    userStore.user.value = data;
    realName.value = data.realName;
    previewUrl.value = await download(data.avatar)
})

// 文件预览
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 退出
const handleLogout = async () => {
    userStore.user.value = {}
    await router.push('/login')
}
</script>

<style scoped lang="scss">
.user-avatar-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;

    .avatar {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}
</style>
