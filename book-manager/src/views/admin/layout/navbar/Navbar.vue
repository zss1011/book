<template>
    <div class="navbar-container">
        <div class="left">
            <div class="breadcrumb">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <template v-for="title in titles" :key="title.path">
                        <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>
        </div>
        <div class="right">
            <el-dropdown trigger="click">
                <div class="avatar">
                    <el-avatar shape="circle" :src="avatarUrl" />
                    <span style="transform: translateY(15px); font-size: 16px">&nbsp;{{ user.realName }}</span>
                    <el-icon class="el-icon--right" style="transform: translateY(15px);">
                        <arrow-down />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-item @click="handleUserInfo">用户资料</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </template>

            </el-dropdown>
            <UserInfo v-model:visible="visible" />
        </div>
    </div>

</template>

<script setup lang="js">
import {ArrowDown, ArrowRight} from "@element-plus/icons-vue";
import {currentUserApi} from "@/api/userApi.js";
import {onMounted, reactive, ref, watch} from "vue";
import {useUserStore} from "@/store/useUserStore.js";
import emitter from "@/config/emitter/emitter.js";
import {getTitles} from "@/use/useNavbar.js";
import {useRouter} from "vue-router";
import {downloadFileApi} from '@/api/fileApi.js'
import UserInfo from "@/views/admin/user/UserInfo.vue";
import {storeToRefs} from "pinia";

// 获取当前用户信息
const user = ref({});
const avatarUrl = ref('')
onMounted(async () => {
    const {data} = await currentUserApi();
    user.value = data;

    // 缓存用户信息
    const userStore = useUserStore();
    userStore.user.value = data;

    // 用户头像
    avatarUrl.value = await download(data.avatar);
})

// 监听事件
let titles = ref(['仪表盘'])
emitter.on('breadcrumb', (path) => {
    // 获取菜单的titles
    titles.value = getTitles(path);
})

// 退出登入
const router = useRouter();
const handleLogout = async () => {
    sessionStorage.removeItem('token');
    const userStore = useUserStore();
    userStore.user.value = {}
    await router.push("/login")
}

// 用户资料
const visible = ref(false)
const handleUserInfo = async () => {
    visible.value = true;
}
watch(visible, async () => {
    if (visible.value === true) {
        return
    }
    const userStore = useUserStore();
    const {user: userCache} = storeToRefs(userStore);
    user.value = userCache.value.value;
    avatarUrl.value = await download(userCache.value.value.avatar);
})

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    const imgUrl = URL.createObjectURL(blob)
    return imgUrl;
    // 触发下载
    // triggerDownload(res)
}
</script>

<style scoped lang="scss">
.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        margin-left: 20px;
    }

    .right {
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 30px;

        .avatar {
            cursor: pointer;
            display: flex;

        }
    }
}
</style>
