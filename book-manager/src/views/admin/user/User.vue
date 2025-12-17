<template>
    <div class="user-container">
        <div class="header">
            <!--登入状态-->
            <el-select clearable v-model="pageDTO.loginStatus" placeholder="登入状态" style="width: 140px; margin-left: 20px">
                <el-option label="在线" :value="1" />
                <el-option label="离线" :value="0" />
            </el-select>
            <!--禁言状态-->
            <el-select clearable placeholder="禁言状态" v-model="pageDTO.muteStatus" style="width: 140px; margin-left: 10px">
                <el-option label="未禁言" :value="0" />
                <el-option label="禁言" :value="1" />
            </el-select>
            <!--注册时间-->
            <el-date-picker
                v-model="pageDTO.register"
                type="daterange"
                range-separator="至"
                start-placeholder="注册开始"
                end-placeholder="注册结束"
                clearable
                @clear="handleClearDatePicker"
                style="width: 220px; margin-left: 10px"
            />
            <!--用户名-->
            <el-input v-model="pageDTO.realName" @keyup.enter="onEnterSearch" placeholder="用户名" style="margin-left: 10px;width: 180px">
                <template #append>
                    <el-button :icon="Search" @click="handleSearch" />
                </template>
            </el-input>
        </div>
        <div class="page">
            <div class="table-wrapper">
                <el-table :data="table" table-layout="fixed" :fit="true" border highlight-current-row class="table">
                    <el-table-column label="头像" width="100" prop="avatar" align="center">
                        <template #default="{row}">
                            <el-avatar shape="circle" :src="row.avatarUrl" />
                        </template>
                    </el-table-column>
                    <el-table-column width="100" label="名称" prop="realName" />
                    <el-table-column width="200" label="账号" prop="username" />
                    <el-table-column width="200" label="邮箱" prop="email" />
                    <el-table-column width="200" label="角色">
                        <template #default="{row}">
                            <el-tag v-for="item in row.roles" :key="item" type="primary" style="margin-right: 5px">{{ item.roleName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" label="封号">
                        <template #default="{row}">
                            {{ row.lockStatus === 1 ? '封号' : '正常' }}
                        </template>
                    </el-table-column>
                    <el-table-column width="100" label="禁言">
                        <template #default="{row}">
                            {{ row.muteStatus === 1 ? '禁言' : '正常' }}
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="注册时间" align="center" prop="createTime" />
                    <el-table-column width="200" label="操作" align="center">
                        <template #default="{row}">
                            <div class="operation">
                                <span @click="handleAccountClick(row)" style="cursor: pointer">账号状态</span>
                                <span @click="handleAccountUpdate(row.id)" style="cursor: pointer">编辑</span>
                                <span @click="handleAccountDelete(row.id)" style="cursor: pointer">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination-wrapper">
                <el-pagination
                    :page-sizes="[2, 3, 5, 10, 20]"
                    layout=" prev, pager, next, sizes,jumper, total"
                    :total="total"
                    v-model:current-page="pageDTO.current"
                    v-model:page-size="pageDTO.size"
                    @change="handlePageChange"
                />
            </div>
        </div>
        <UserInfo v-model:visible="userInfoVisible" :userId="userId" />
        <el-dialog v-model="accountStatusVisible"
                   title="账户状态" width="15%"
        >
            <div>
                <div>
                    <span style="margin-right: 10px">封号状态:</span>
                    <el-switch v-model="lockStatus" style="--el-switch-on-color: rgb(91, 156, 247); --el-switch-off-color: rgb(221,223, 230)" />
                </div>
                <div style="margin-top: 10px">
                    <span style="margin-right: 10px">禁言状态:</span>
                    <el-switch v-model="muteStatus" style="--el-switch-on-color: rgb(91, 156, 247); --el-switch-off-color: rgb(221,223, 230)" />
                </div>
            </div>
            <template #footer>
                <el-button type="default" @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleUpdate">修改</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="js">
import {computed, onMounted, ref} from "vue";
import dayjs from "dayjs";
import {Search} from '@element-plus/icons-vue'
import {updateUserApi, userPageApi} from "@/api/userApi.js";
import {downloadFileApi} from '@/api/fileApi.js'
import UserInfo from "@/views/admin/user/UserInfo.vue";
import emitter from "@/config/emitter/emitter.js";
import {ElMessage, ElMessageBox} from "element-plus";

// -----账户状态dialog-----
const accountStatusVisible = ref(false)
// 账号状态
const lockStatus = ref(true)
const muteStatus = ref(true)
const handleAccountClick = (data) => {
    accountStatusVisible.value = true
    userId = data.id
    lockStatus.value = data.lockStatus === 1
    muteStatus.value = data.muteStatus === 1
}
const handleCancel = () => {
    accountStatusVisible.value = false
}
const handleUpdate = async () => {
    accountStatusVisible.value = false
    await updateUserApi({
        userId: userId,
        lockStatus: lockStatus.value ? 1 : 0,
        muteStatus: muteStatus.value ? 1 : 0,
    })
    // 分页查询
    await queryUserPage()
}
// ------------


// 搜索
const handleSearch = async () => {
    // 同步时间
    const register = pageDTO.value.register
    if (register?.length === 2) {
        pageDTO.value.startTime = dayjs(register[0]).format("YYYY-MM-DD HH:mm:ss");
        pageDTO.value.endTime = dayjs(register[1]).format("YYYY-MM-DD HH:mm:ss");
    }
    // 分页查询
    await queryUserPage()
}
const onEnterSearch = async () => {
    await handleSearch();
}

// 列表数据
const table = ref([])

// 账号编辑
const userInfoVisible = ref(false)
let userId = '';
const handleAccountUpdate = (id) => {
    userId = id;
    userInfoVisible.value = true
}

// 账号删除
const handleAccountDelete = async (id) => {
    try {
        await ElMessageBox.confirm('是否要删除?', '警告', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
        });
        ElMessage.success('删除成功');
    } catch {
        ElMessage.info('取消成功');
    }
}

// 分页数据
const pageDTO = ref({
    current: 1,
    size: 5,
    total: 0,
    loginStatus: null, // 登入状态 0未登入 1登入
    muteStatus: null, // 禁言状态 0正常 1禁言
    register: [], // 注册时间
    startTime: null, // 注册开始时间
    endTime: null, // 注册结束时间
    realName: null, // 用户名
})
const total = ref(0)

onMounted(async () => {
    // 分页查询用户列表
    await queryUserPage();
})

// 监听时间:刷新用户列表
emitter.on('refreshUserPage', async (data) => {
    // 分页查询用户列表
    await queryUserPage();
})

// 更新条件:分页查询用户列表
const handlePageChange = async (pageCurrent, pageSize) => {
    pageDTO.value.current = pageCurrent;
    pageDTO.value.size = pageSize;
    await queryUserPage()
}

// 分页查询用户
const queryUserPage = async () => {
    const res = await userPageApi(pageDTO.value)
    table.value = res.data.records
    total.value = res.data.total
    // 填充头像地址属性
    await fillAvatar(table.value);
}

// 填充头像地址属性
const fillAvatar = async (table) => {
    for (let item of table) {
        const avatarUrl = await download(item.avatar);
        item.avatarUrl = avatarUrl;
    }
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 清理日期
const handleClearDatePicker = () => {
    pageDTO.value.startTime = null;
    pageDTO.value.endTime = null;
}

</script>

<style scoped lang="scss">
.user-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
    }

    .page {
        width: 100%;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;

        .table-wrapper {
            width: 100%;
            max-height: 80vh;

            .table {
                width: 100%;
                height: 100%;
                padding-left: 20px;
                padding-top: 10px;
                box-sizing: border-box;
                min-height: 0;
                overflow: hidden;

                .operation {
                    display: flex;
                    justify-content: space-evenly;
                    color: rgb(146, 156, 170);
                }
            }
        }

        .pagination-wrapper {
            flex: 1;
            min-height: 100px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 20px;
        }
    }
}

:deep(.header .el-input__wrapper) {
    flex-grow: 0 !important;
}
</style>
