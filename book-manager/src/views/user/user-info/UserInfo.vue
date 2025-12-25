<template>
    <div class="user-info-container">
        <div class="title">个人中心</div>
        <div class="content">
            <el-tabs class="tabs">
                <el-tab-pane label="修改资料">
                    <el-form :model="userInfoForm" :rules="userInfoRules" ref="userInfoFormRef" class="user-info-form">
                        <el-form-item label="头像" label-position="top" required>
                            <el-upload :http-request="uploadAvatar" :show-file-list="false">
                                <img v-if="userInfoForm.previewUrl" :src="userInfoForm.previewUrl" style="width: 80px; height: 80px" />
                                <el-icon v-else>
                                    <plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="账户" prop="username" label-position="top" required>
                            <el-input v-model="userInfoForm.username" disabled />
                        </el-form-item>
                        <el-form-item label="姓名" prop="realName" label-position="top" required>
                            <el-input v-model="userInfoForm.realName" />
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" label-position="top" required>
                            <el-input v-model="userInfoForm.email" />
                        </el-form-item>
                        <el-form-item label-position="top" required>
                            <template #label>
                                <span class="field-label">账号状态</span>
                                <el-tooltip content="修改账号状态，请联系管理员" placement="top">
                                    <el-icon>
                                        <InfoFilled />
                                    </el-icon>
                                </el-tooltip>
                            </template>

                            <div v-if="userInfoForm.lockStatus === 0" class="account-status-normal">
                                <el-icon>
                                    <Icon勾 />
                                </el-icon>
                                <span>正常</span>
                            </div>
                            <div v-else class="account-status-error">
                                <el-icon>
                                    <Icon错误空心 />
                                </el-icon>
                                <span>锁定</span>
                            </div>
                        </el-form-item>
                        <el-form-item label-position="top" required>
                            <template #label>
                                <span class="field-label">留言状态</span>
                                <el-tooltip content="修改留言状态，请联系管理员" placement="top">
                                    <el-icon>
                                        <InfoFilled />
                                    </el-icon>
                                </el-tooltip>
                            </template>
                            <div v-if="userInfoForm.muteStatus === 0" class="account-status-normal">
                                <el-icon>
                                    <Icon勾 />
                                </el-icon>
                                <span>正常</span>
                            </div>
                            <div v-else class="account-status-error">
                                <el-icon>
                                    <Icon错误空心 />
                                </el-icon>
                                <span>禁言</span>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="update-user-info-btn">
                                <el-button type="primary" @click="handleUpdateUserInfo">立即修改</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码">
                    <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" class="form">
                        <el-form-item label="原始密码" prop="password" label-position="top" required>
                            <el-input v-model="passwordForm.password" type="password" placeholder="旧密码" show-password />
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPassword" label-position="top" required>
                            <el-input v-model="passwordForm.newPassword" type="password" placeholder="新密码" show-password />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="dupPassword" label-position="top" required>
                            <el-input v-model="passwordForm.dupPassword" type="password" placeholder="确认密码" show-password />
                        </el-form-item>
                        <el-form-item>
                            <div class="update-password-btn">
                                <el-button type="primary" @click="handleUpdatePassword">立即修改</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="js">
import {computed, onMounted, reactive, ref, watch} from "vue";
import {updatePasswordApi, updateUserApi, validPasswordApi} from "@/api/userApi.js";
import {useUserStore} from "@/store/useUserStore.js";
import {useRoute, useRouter} from "vue-router";
import {previewUrl} from "@/utils/fileUtil.js";
import {InfoFilled, Plus} from "@element-plus/icons-vue";
import {uploadFileApi} from "@/api/fileApi.js";
import {ElMessage} from "element-plus";

const {user} = useUserStore()
const router = useRouter();
const route = useRoute()

// 修改资料
const userInfoForm = reactive({
    userId: user.value.id,
    username: user.value.username,
    avatar: user.value.avatar,
    realName: user.value.realName,
    previewUrl: '',
    email: user.value.email,
    lockStatus: user.value.lockStatus,
    muteStatus: user.value.muteStatus,
})

const userInfoFormRef = ref(null)

// 上传头像
const uploadAvatar = async (option) => {
    const {data} = await uploadFileApi(option.file);
    userInfoForm.avatar = data
    userInfoForm.previewUrl = await previewUrl(data)
}

watch(() => userInfoForm.avatar, async (val) => {
    userInfoForm.previewUrl = await previewUrl(val)
}, {immediate: true})

const validateEmail = (rule, value, callback) => {
    if (!(value && value.includes("@"))) {
        callback(new Error('邮箱格式错误'))
        return
    }
    callback()
}

const userInfoRules = {
    realName: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
    email: [
        {required: true, message: '邮箱不能为空', trigger: 'blur'},
        {validator: validateEmail, trigger: 'blur'}
    ],
}

const handleUpdateUserInfo = async () => {
    try {
        await userInfoFormRef.value.validate()
        const body = {
            userId: userInfoForm.userId,
            realName: userInfoForm.realName,
            avatar: userInfoForm.avatar,
            email: userInfoForm.email,
        }
        await updateUserApi(body);
        await executeLogout()
    } catch (e) {
        ElMessage({type: 'error', message: '校验不通过'})
    }
}

// 修改密码
const passwordForm = reactive({
    password: "", // 旧密码
    newPassword: "", // 新密码
    dupPassword: "", // 确认新密码
})

const passwordFormRef = ref(null)

const validateOldPassword = async (rule, value, callback) => {
    const {data} = await validPasswordApi(user.value.id, value);
    if (data) {
        callback();
        return
    }
    callback(new Error('密码错误'))
}

const validatePassword = (rule, value, callback) => {
    if (passwordForm.newPassword !== passwordForm.dupPassword) {
        callback(new Error('密码不一致'))
    }
}

const passwordRules = {
    password: [
        {required: true, message: '旧密码不能为空', trigger: 'blur'},
        {validator: validateOldPassword, trigger: "blur"}],
    newPassword: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
    ],
    dupPassword: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
        {validator: validatePassword, trigger: "blur"}
    ]
}

// 修改密码
const handleUpdatePassword = async () => {
    try {
        // 表单校验（不通过会 throw）
        await passwordFormRef.value.validate()
        // 调接口
        const body = {
            userId: user.value.id,
            oldPassword: passwordForm.password,
            newPassword: passwordForm.newPassword,
        }
        const {data} = await updatePasswordApi(body)
        if (!data) {
            throw new Error('update password failed')
        }
    } catch (e) {
        const msg = e?.message === 'update password failed' ? '密码修改失败' : '校验不通过'
        ElMessage({type: 'error', message: msg})
        return;
    }
    // 退出登入
    await executeLogout()
}

// 退出
const executeLogout = async () => {
    useUserStore().user.value = {}
    await router.push('/login')
}

</script>

<style scoped lang="scss">
.user-info-container {
    .title {
        margin-top: 20px;
        height: 80px;
        width: 100%;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        line-height: 80px;
    }

    .content {
        display: flex;
        justify-content: center;

        .tabs {
            width: 60%;

            .form {
                width: 500px;

                .update-password-btn {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                }
            }

            .user-info-form {
                width: 500px;

                .account-status-normal {
                    color: rgb(82, 155, 46);
                }

                .account-status-error {
                    color: rgb(196, 86, 86);
                }

                .field-label {
                    margin-right: 5px;
                }

                .update-user-info-btn {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }

            .update-password {
                .password {
                    height: 40px;
                    font-weight: bold;
                    font-size: 18px;
                    margin: 10px 0;
                    width: 60%;
                }
            }


        }
    }

    :deep(.el-tabs__nav-wrap::after) {
        display: none;
    }

    :deep(.el-tabs__active-bar) {
        display: none;
    }

    :deep(.el-input__wrapper) {
        background-color: rgb(248, 248, 248);
    }

    :deep(.el-upload--text) {
        border: 1px dashed #dcdfe6;
    }
}
</style>
