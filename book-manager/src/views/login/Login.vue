<template>
    <div class="login-container">
        <div class="title">图书管理系统</div>
        <div class="login">
            <div class="login-form">
                <div style="font-size: 24px; margin-top: 30px; text-align: center">快登入吧</div>
                <el-form :model="login" :rules="rules" class="form-content">
                    <el-form-item prop="username" style="margin-top: 20px">
                        <el-input v-model="login.username" :prefix-icon="Avatar" placeholder="请输入账户" style="width: 300px" />
                    </el-form-item>
                    <el-form-item prop="password" style="margin-top: 20px">
                        <el-input v-model="login.password" @keyup.enter="onEnterLogin" :prefix-icon="Lock" type="password" show-password placeholder="请输入密码" style="width: 300px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleLogin" type="primary" style="width: 300px; margin-top: 20px">立即登入</el-button>
                    </el-form-item>
                </el-form>
                <div style="text-align: left; padding-left: 40px;margin-top: 5px; font-size: 12px">
                    <span style="color: #414151">没有账号?  </span>
                    <span @click="goRegister" style="cursor: pointer">点击注册</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import {ref} from "vue";
import {Avatar, Lock} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";
import {currentUserApi, userLoginApi} from "@/api/userApi.js";
import {ElMessage} from "element-plus";

// 登入账户
let login = ref({
    username: "zs",
    password: "123",
})

// 跳转注册页
const router = useRouter()
const goRegister = () => {
    router.push('/register')
}

// 用户登入
const handleLogin = async () => {
    const res = await userLoginApi(login.value)
    let token = res.data
    if (res.code !== 200) {
        return;
    }
    ElMessage({
        message: '登入成功',
        type: 'success',
    })
    // 存储token
    sessionStorage.setItem('token', token)

    // 获取当前用户信息
    const {data} = await currentUserApi();
    const roles = Array.isArray(data.roles) ? data.roles : [];
    for (let role of roles) {
        if (role.roleName === '管理员') {
            await router.push('/')
            return
        }
    }
    await router.push('/user/background')
}

// 处理用户登入
const onEnterLogin = async () => {
    await handleLogin();
}

const rules = {
    username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
    password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
}

</script>

<style scoped lang="scss">
.login-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    .title {
        margin-top: 120px;
        font-size: 36px;
        text-align: center;

    }

    .login {
        margin-top: 30px;
        width: 50vw;
        height: 50vh;
        align-self: center;
        background: url('@/images/login.png') center/cover no-repeat;

        display: flex;
        justify-content: flex-end;

        .login-form {
            height: 80%;
            width: 40%;
            background: #fff;
            transform: translate(-20px, 60px);
            opacity: 95%;

            .form-content {
                margin-top: 30px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    }
}

</style>
