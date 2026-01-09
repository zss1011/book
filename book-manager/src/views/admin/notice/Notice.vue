<template>
    <div class="notice-container">
        <div class="header">
            <div style="font-size: 14px; color: gray">公告标题</div>
            <el-input v-model="pageDTO.bookName" size="small" style="width: 140px" />
            <div style="font-size: 14px; color: gray">发布时间</div>
            <el-date-picker
                class="date-picker"
                v-model="dateScope"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="small"
                style="width: 200px; margin-left: 10px;  display: flex;"
            />
            <el-button type="primary" plain size="small" @click="handleQueryPage">立即查询</el-button>
            <el-button type="primary" plain size="small" @click="handleAddNotice">新增公告</el-button>
        </div>
        <div class="body">
            <el-table :data="richTextPageData" style="width: 60%">
                <el-table-column prop="title" label="公告" align="left" />
                <el-table-column prop="createTime" label="发布时间" align="left" width="200" />
                <el-table-column label="操作" width="200" align="left">
                    <template #default="{row}">
                        <el-button plain size="small" style="margin-right: 3px" @click="handleUpdate(row.id)">修改</el-button>
                        <el-button plain size="small" @click="handleDelete(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="js">
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import dayjs from "dayjs";
import {deleteRichTextApi, richTextPageApi} from "@/api/richTextApi.js";

const dateScope = ref('')
const pageDTO = reactive({
    current: 1,
    size: 10,
    bookName: '',
    startTime: null,
    endTime: null,
})

const richTextPageData = reactive([])

onMounted(async () => {
    await handleQueryPage();
})

setInterval(() => {

}, 3000)

// 分页查询:公告
const handleQueryPage = async () => {
    if (dateScope.value !== '') {
        pageDTO.startTime = dayjs(dateScope.value[0]).format("YYYY-MM-DD HH:mm:ss")
        pageDTO.endTime = dayjs(dateScope.value[1]).format("YYYY-MM-DD HH:mm:ss")
    }
    const res = await richTextPageApi(pageDTO)
    richTextPageData.length = 0;
    Object.assign(richTextPageData, res.data.records)
}

const router = useRouter();
const handleAddNotice = async () => {
    await router.push('/notice/add');
}

// 修改公告
const handleUpdate = async (id) => {
    await handleAddNotice()
    await router.push({
        path: '/notice/add',
        query: {id: id}
    });
}

// 删除公告
const handleDelete = async (id) => {
    await deleteRichTextApi(id);
    await handleQueryPage();
}


</script>

<style scoped lang="scss">
.notice-container {
    .header {
        padding: 20px 0 0 20px;
        display: flex;
        gap: 10px;
        align-items: center;

        :deep(.el-input__wrapper) {
            flex-grow: 0;
        }
    }

    .body {
        padding-top: 20px;
        padding-left: 20px;
    }
}

:deep {
    .el-button + .el-button {
        margin-left: 0;
    }

    .el-button.el-button--small.is-plain {
        border: none;
        color: #a1a0a0;
    }
}
</style>
