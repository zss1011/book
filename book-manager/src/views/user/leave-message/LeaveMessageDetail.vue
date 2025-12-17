<template>
    <div class="leave-message-detail-container">
        <div class="message-wrapper">
            <div class="message">
                <div style="margin-right: 400px" v-for="(list,index) in data" :key="list[0].id">
                    <div class="leave-message" style="margin-bottom: 15px">
                        <el-avatar shape="square" style="width: 30px" :src="list[0].avatar"></el-avatar>
                        <span style="display:inline-block; font-weight: bold; margin: 0  0  6px 10px;">{{ list[0].realName }}</span>
                        <div style="margin: 0 0 6px 40px; font-size: 14px; color: #504f4f; font-weight: 500; width: 600px;">{{ list[0].comment }}</div>
                        <div class="time-reply">
                            <div style="margin-left: 40px; font-size: 12px; color: #aaa">{{ list[0].createTime }}</div>
                            <div style="margin-left: 100px; font-size: 12px; color: #aaa; cursor: pointer" @click="handleReply(list[0].id); handleCreate(list[0])">回复</div>
                        </div>
                        <div class="comment" v-if="activeReplyId === list[0].id" style="margin: 6px 0 6px 0">
                            <el-input :ref="el => inputRefMap[list[0].id] = el" v-model="replyContent" :rows="1" type="textarea" :placeholder="'回复 ' + list[0].realName"
                                      style="width: 92%; margin-left: 40px;" />
                            <div style="display: flex">
                                <el-button type="primary" size="small" plain @click="handleCancel">取消</el-button>
                                <el-button type="primary" size="small" plain @click="handleAdd">发布</el-button>
                            </div>

                        </div>
                    </div>
                    <div v-if="!expandIds.includes(list[0].businessId) && list.length-1 >= 2" style="margin-left: 40px; font-size: 12px; color: #aaa">
                        <span>共{{ list.length - 1 }}条回复，</span>
                        <span class="expand-action" @click="handleExpand(list[0].businessId)">点击查看</span>
                    </div>
                    <div v-else class="reply" v-if="list.length > 1" style="margin-left: 40px">
                        <div v-for="(item, index) in list.slice(1)" :key="item.id" style="margin-bottom: 15px">
                            <el-avatar shape="square" style="width: 30px" :src="item.avatar"></el-avatar>
                            <span style="display:inline-block; font-weight: bold; margin: 0 0 6px 10px">
                        {{ item.realName }}
                            <template v-if="item.toRealName">
                                <Arrows style="width: 12px; height: 12px; margin-bottom: 2px; vertical-align:middle; color: #aaa" />
                                {{ item.toRealName }}
                            </template>
                    </span>
                            <div style="width: 600px ;margin-left: 40px; font-size: 14px; color: #504f4f; word-break: break-all;">{{ item.comment }}</div>
                            <div class="time-reply" style="margin-top: 6px">
                                <div style="padding-left: 40px; font-size: 12px; color: #aaa">{{ item.createTime }}</div>
                                <div style="margin-left: 100px; font-size: 12px; color: #aaa; cursor:pointer;" @click="handleReply(item.id); handleCreate(item)">回复</div>
                            </div>
                            <div class="comment" v-if="activeReplyId === item.id">
                                <el-input :ref="el => inputRefMap[item.id] = el" v-model="replyContent" :rows="1" type="textarea" :placeholder="'回复 ' + item.realName"
                                          style="width: 92%; margin-left: 40px;" />
                                <el-button type="primary" size="small" plain @click="handleAdd">发布</el-button>
                            </div>
                            <div v-if="index === list.slice(1).length - 1 && list.length-1 >= 2" class="closeReply" @click="handleCloseReply(item.businessId)">收起回复</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-pagination
                v-model:current-page="pageDTO.current"
                v-model:page-size="pageDTO.size"
                layout="prev, pager, next, jumper,total, sizes"
                :total="pageDTO.total"
                @change="handlePageChange"
                :page-sizes="[5, 10, 20]"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {nextTick, onMounted, reactive, ref} from "vue";
import {downloadFileApi} from '@/api/fileApi.js'
import Arrows from '@/svg/右箭头.svg'
import {getUserCommentsApi, addUserCommentApi, getAllUserCommentsApi, userCommentPageApi} from "@/api/userCommentApi.js";
import {currentUserApi} from "@/api/userApi.js";
import emitter from "@/config/emitter/emitter.js";

const replyContent = ref('')
const activeReplyId = ref(0)
const inputRefMap = ref({})

const data = ref([])

onMounted(async () => {
    await queryPage();
})

// 查询分页
const queryPage = async () => {
    const res = await userCommentPageApi(pageDTO);
    for (let datas of res.data.records) {
        for (let item of datas) {
            item.avatar = await download(item.avatar)
            if (item.toAvatar) {
                item.toAvatar = await download(item.toAvatar)
            }
        }
    }
    data.value = res.data.records
    pageDTO.total = res.data.total
}

// 分页查询用户评论
const pageDTO = reactive({
    current: 1,
    size: 5,
    total: 100,
})
const handlePageChange = async (current, size) => {
    pageDTO.current = current
    pageDTO.size = size
    await queryPage();
}

const handleReply = (id) => {
    activeReplyId.value === id ? activeReplyId.value = 0 : activeReplyId.value = id
    nextTick(() => {
        setTimeout(() => {
            const input = inputRefMap.value[id];
            if (input) {
                input.focus()
            }
        }, 500)
    })
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 新增回复 addUserCommentApi
const dto = ref({})
const handleCreate = async (data) => {
    // 获取当前用户信息
    const res = await currentUserApi();
    dto.value = {
        userId: res.data.id,
        anonymous: 0,
        comment: replyContent.value,
        toUserId: data.userId,
        parentId: data.id,
        businessId: data.businessId,
    }
}

const handleCancel = () => {
    activeReplyId.value = -1;
}

const handleAdd = async () => {
    dto.value.comment = replyContent.value
    await addUserCommentApi(dto.value)
    activeReplyId.value = 0
    await refreshComment(dto.value.businessId);
    replyContent.value = ''
}

// 刷新评论
const refreshComment = async (businessId) => {
    const res = await getUserCommentsApi(businessId)
    for (let data of res.data) {
        data.avatar = await download(data.avatar)
        if (data.toAvatar) {
            data.toAvatar = await download(data.toAvatar)
        }
    }
    data.value[0] = res.data
}

// 展开回复的businessIds
const expandIds = ref([])
const handleExpand = async (businessId) => {
    if (!expandIds.value.includes(businessId))
        expandIds.value.push(businessId)
}
// 收起回复
const handleCloseReply = async (businessId) => {
    expandIds.value = expandIds.value.filter(id => id !== businessId)
}

// 监听数据刷新事件  refreshLeaveMessage
emitter.on('refreshLeaveMessage', async (data) => {
    if (data) {
        pageDTO.keyword = data.keyword
        pageDTO.status = data.status
    }
    await queryPage();
})


</script>

<style scoped lang="scss">
.leave-message-detail-container {
    display: flex;
    flex-direction: column;
    height: 80vh;

    .message-wrapper {
        flex-grow: 0;
        overflow: auto;
        width: 100%;
        height: 75vh;
        display: flex;
        flex-direction: column;
        padding-left: 300px;

        .message {
            width: 80%;
            height: 100%;
            overflow: auto;
        }

        .time-reply {
            display: flex;
            justify-content: space-between;
        }

        .comment {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;
        }

        .expand-action {
            cursor: pointer;

            &:hover {
                color: rgb(110, 187, 235)
            }
        }

        .closeReply {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
            color: rgb(23, 30, 38);

            &:hover {
                color: rgb(110, 187, 235)
            }
        }
    }

    .footer {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
    }
}
</style>
