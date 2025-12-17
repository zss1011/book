<template>
    <div class="register-container">
        <el-card style="transform: translateY(-30px)">
            <div class="register" style="margin-top: 20px">
                <div class="title2" style="display: flex">
                    <span style="margin-left: 50px">
                        <MySvg style="width: 24px; height: 24px; margin-top: 2px; vertical-align:middle;" />
                    </span>
                    <span style="margin-top: 2px; margin-left: 6px; display: inline-block; font-weight: bolder; font-size: 20px">我要注册</span>
                </div>
                <el-form :model="register" class="register-form">
                    <el-form-item prop="username">
                        <el-input v-model="register.username" placeholder="请输入账户" class="username" />
                    </el-form-item>
                    <el-form-item prop="password1">
                        <el-input v-model="register.password" placeholder="请输入密码" class="password"
                                  type="password" />
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input v-model="register.password2" placeholder="请再次输入密码" class="password"
                                  type="password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="handleRegister" type="primary" style=" margin-left: 42px; width: 200px;">立即注册</el-button>
                    </el-form-item>
                </el-form>
                <div class="back-login">
                    <span style="font-size: 12px; color: gray; margin-left: 42px">已有账户?</span>
                    <span @click="goLogin" style="font-size: 12px; margin-left: 5px; cursor: pointer">返回登入</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="js">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {registerUserApi} from "@/api/userApi.js";
import {ElMessage} from "element-plus";
import MySvg from '@/svg/我的学习.svg'

// 注册账户
const register = ref({
    username:'',
    password:'',
    password2:'',
})

// 返回登入
const router = useRouter();
const goLogin = () => {
    router.push("/login")
}

// 注册用户
const handleRegister = async () => {
    // 先检验密码是否一致
    if (register.value.password != register.value.password2) {
        ElMessage({
            message: '密码不一致',
            type: "error",
        })
        return;
    }
    const res = await registerUserApi(register.value)
    console.log(res)
    if (res.code !== 200) {
        return
    }
    // 注册成功提示
    ElMessage({message: '注册成功', type: 'success'})
    setTimeout(() => {
        router.push('/login')
    }, 3000)
}

</script>

<style scoped lang="scss">
.register-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .register {
        width: 300px;
        height: 35vh;

    }

    .register-form {
        .username {
            width: 200px;
            margin-top: 20px;
            margin-left: 42px;

            :deep(.el-input__inner::placeholder) {
                color: black;
                font-size: 12px;
                opacity: 0.5;
                font-weight: bolder;
            }

        }

        .password {
            width: 200px;
            margin-left: 42px;

            :deep(.el-input__inner::placeholder) {
                color: black;
                font-size: 12px;
                opacity: 0.5;
                font-weight: bolder;
            }

        }
    }


}
</style>
