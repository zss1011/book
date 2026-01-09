<template>
    <div class="user-info-container">
        <el-dialog v-model="dialogVisible" @close="handleClose"
                   title="个人中心" width="20%"
        >
            <el-form :model="user" class="form-item-content" label-position="top">
                <el-form-item label="*头像">
                    <el-upload class="avatar-uploader"
                               :show-file-list="false"
                               :http-request="uploadFile"
                               :on-success="handleAvatarSuccess"
                    >
                        <img v-if="previewImgUrl" :src="previewImgUrl" class="avatar">
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="*用户名">
                    <el-input v-model="user.realName" size="default" style="width: 100px" />
                </el-form-item>
                <el-form-item label="*用户邮箱">
                    <el-input v-model="user.email" style="width: 200px" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="default" @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="updateUserInfo">修改</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="js">
import {onMounted, ref, watch} from "vue";
import {currentUserApi, getUserByIdApi, updateUserApi} from "@/api/userApi.js";
import {Plus} from "@element-plus/icons-vue";
import {downloadFileApi, uploadFileApi} from '@/api/fileApi.js'
import {useUserStore} from "@/store/useUserStore.js";
import emitter from "@/config/emitter/emitter.js";

const emits = defineEmits(['update:visible']);
const props = defineProps(['visible', 'userId']);

// 通过v-model与父组件一起控制dialog的显示
const dialogVisible = ref(props.visible)
watch(() => props.visible, (val) => {
    dialogVisible.value = val
})
const handleClose = () => {
    dialogVisible.value = false
    emits('update:visible', dialogVisible.value)
}

const user = ref({})
onMounted(async () => {
    // 获取用户信息
    const userRes = await currentUserApi();
    user.value = userRes.data
    // 预览用户头像
    previewImgUrl.value = await download(user.value.avatar);
})

setInterval(() => {

}, 3000)

watch(() => props.userId, async (val) => {
    if (!val) return;
    // 获取用户信息
    const userRes = await getUserByIdApi(val);
    user.value = userRes.data
    // 预览用户头像
    previewImgUrl.value = await download(user.value.avatar);
})

const previewImgUrl = ref('')
const handleAvatarSuccess = async () => {
    previewImgUrl.value = await download(user.value.avatar);
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}
// 上传文件(头像)
const uploadFile = async (option) => {
    const uploadFileRes = await uploadFileApi(option.file)
    user.value.avatar = uploadFileRes.data
}

const closeDialog = () => {
    dialogVisible.value = false
}

// 修改用户信息
const updateUserInfo = async () => {
    user.value.userId = user.value.id;
    await updateUserApi(user.value)

    // 同步更新本地的用户缓存
    await updateLocalUser();

    closeDialog();

    // 事件通知:刷新用户列表
    emitter.emit('refreshUserPage', null)
}

const updateLocalUser = async () => {
    const userRes = await currentUserApi();
    const userStore = useUserStore();
    userStore.user.value = userRes.data;
}
</script>

<style scoped lang="scss">
.user-info-container {
    .avatar-uploader .avatar {
        width: 90px;
        height: 90px;
        display: block;
    }

    .dialog-footer {
        display: flex;
        justify-content: center;
    }
}


</style>
