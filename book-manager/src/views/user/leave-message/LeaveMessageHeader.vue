<template>
    <div class="leave-message-header-container">
        <div class="search-wrapper">
            <el-input placeholder="搜索用户留言" v-model="keyword" style="width: 720px; height: 50px">
                <template #suffix>
                    <el-icon style="cursor: pointer" @click="handleSearch">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="button-wrapper">
            <div class="btn-plain">
                <el-button type="default" @click="handleStatus(1)" text :class="{active : activeStatus === 1}">全部</el-button>
                <el-button type="default" @click="handleStatus(2)" text :class="{active : activeStatus === 2}">已回复</el-button>
                <el-button type="default" @click="handleStatus(3)" text :class="{active : activeStatus === 3}">未回复</el-button>
                <el-button type="default" @click="handleStatus(4)" text :class="{active : activeStatus === 4}">我的发布</el-button>
            </div>
            <el-button type="primary" @click="handleLeaveMessage">
                <Arrows style="width: 12px; height: 12px; margin-right: 6px; vertical-align:middle;  color: white;" />
                我要留言
            </el-button>
        </div>
        <el-dialog v-model="dialogVisible" width="700">
            <div style="margin-bottom: 20px">内容</div>
            <el-input v-model="leaveMessage" type="textarea" :rows="3" />
            <template #footer>
                <el-button plain type="info" @click="handleCancel">取消操作</el-button>
                <el-button plain type="primary" @click="handleSave">确定留言</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="js">
import {Search} from '@element-plus/icons-vue'
import Arrows from "@/svg/右上箭头.svg";
import {onMounted, reactive, ref} from "vue";
import {addUserCommentApi, userCommentPageApi} from "@/api/userCommentApi.js";
import {currentUserApi} from "@/api/userApi.js";
import {getUuid} from "@/utils/uuIdUtil.js";
import emitter from "@/config/emitter/emitter.js";

const dialogVisible = ref(false);
const leaveMessage = ref('')
// 创建留言
const handleLeaveMessage = async () => {
    dialogVisible.value = true
}

const handleCancel = () => {
    dialogVisible.value = false
}
const handleSave = async () => {
    const {data} = await currentUserApi();
    const body = {
        userId: data.id,
        businessId: getUuid(),
        comment: leaveMessage.value
    }
    await addUserCommentApi(body)
    dialogVisible.value = false
    leaveMessage.value = ''
    // 发布更新时间
    emitter.emit('refreshLeaveMessage', null)
}

// 搜索
const keyword = ref('')
const data = reactive({})

const emitRefresh = () => {
    emitter.emit('refreshLeaveMessage', {...data})
}

const handleSearch = () => {
    data.keyword = keyword.value
    emitRefresh()
}

const handleStatus = async (status) => {
    data.status = status
    emitRefresh();
    activeStatus.value = status
}

const activeStatus = ref(1)
</script>

<style scoped lang="scss">
.leave-message-header-container {
    height: 500px;
    width: 100%;

    .search-wrapper {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-left: -300px;
    }

    .button-wrapper {
        margin-left: 320px;
        margin-top: 20px;
        width: 730px;
        display: flex;
        justify-content: space-between;

        .active {
            background-color: rgba(240, 242, 245);
        }
    }

}

:deep(.el-input__suffix) {
    color: black;
    font-size: 16px;
}
</style>
