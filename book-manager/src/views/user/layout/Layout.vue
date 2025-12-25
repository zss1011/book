<template>
    <div class="layout-container">
        <div class="sidebar">
            <Sidebar />
            <div class="user-menu" @click="handleRouter(user.value.id)">
                <el-avatar :size="30" :src="previewUrl" />
                <div class="realName">{{ realName }}</div>
            </div>
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
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/useUserStore.js";
import {downloadFileApi} from '@/api/fileApi.js'
import {useRouter} from "vue-router";

const {user} = useUserStore();
const router = useRouter();

const realName = ref('');
let previewUrl = ref('')

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    realName.value = user.value.realName
    previewUrl.value = await download(user.value.avatar);
})

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 处理路由
const handleRouter = async (userId) => {
    await router.push({
        path: "/user/background/info",
        query: {
            userId: userId
        }
    })
}

</script>

<style scoped lang="scss">
.layout-container {
    display: flex;
    position: relative;

    .sidebar {
        min-width: 12vw;
        height: 100vh;
        background-color: rgb(226, 228, 229);

        .user-menu {
            width: 100%;
            height: 36px;
            display: flex;
            margin-left: 20px;
            margin-top: 10px;
            cursor: pointer;
            align-items: center;
            gap: 3px;

            .realName {
                font-size: 14px;
            }
        }
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
