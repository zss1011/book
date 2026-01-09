<template>
    <div class="borrow-container">
        <div class="header">
            <div class="borrow-time">借阅时间</div>
            <el-date-picker
                v-model="queryPage.borrowTimeScope"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="default"
                clearable
                @change="handleDateChange"
            />
            <el-button type="primary" plain size="default" @click="handleSearch">立即查询</el-button>
        </div>
        <div class="content">
            <el-table :data="tableData" class="table">
                <el-table-column prop="bookName" label="书籍名" width="360" />
                <el-table-column prop="borrowRealName" label="借阅者" width="180" />
                <el-table-column prop="number" label="馆藏数" width="180" />
                <el-table-column label="是否归还" width="180">
                    <template #default="{row}">
                        {{ row.returnStatus ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="returnTime" label="归还时间" width="180" />
                <el-table-column prop="borrowDate" label="借阅时间" width="180" />
                <el-table-column label="操作">
                    <template #default="{row}">
                        <el-button type="primary" plain size="small" @click="handleDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, reactive, ref} from "vue";
import {adminBookBorrowPageApi} from "@/api/userBookRelationApi.js";
import dayjs from "dayjs";
import {DATE_TIME_FORMAT} from "@/utils/dateFormat.js";

const queryPage = reactive({
    current: 1,
    size: 10,
    borrowTimeScope: [],
    startTime: null,
    endTime: null,
    total: 0,
})

const tableData = ref([])

onMounted(async () => {
    await fetchTableData();
})

const fetchTableData = async () => {
    const body = {
        current: 1,
        size: 5,
        startTime: queryPage.startTime,
        endTime: queryPage.endTime,
    }
    const {data} = await adminBookBorrowPageApi(body);
    queryPage.total = data.total;
    tableData.value = data.records
    console.log(data)
}

const handleSearch = async () => {
    await fetchTableData()
}

const handleDateChange = async () => {
    queryPage.startTime = null;
    queryPage.endTime = null;
    if (queryPage.borrowTimeScope?.length > 0) {
        queryPage.startTime = dayjs(queryPage.borrowTimeScope[0]).format(DATE_TIME_FORMAT);
        queryPage.endTime = dayjs(queryPage.borrowTimeScope[1]).format(DATE_TIME_FORMAT);
    }
}

// todo zss 1
const handleDelete = async (row) => {
    console.log(row)
}

setInterval(() => {
}, 3000)
</script>

<style scoped lang="scss">
.borrow-container {

    .header {
        height: 100px;
        display: flex;
        gap: 10px;
        align-items: center;
        padding-left: 10px;

        .borrow-time {
            color: gray;
        }
    }

    .content {
        display: flex;

        .table {
            margin-left: 10px;
            width: 85%;
        }
    }
}

:deep(.el-date-editor ) {
    max-width: 200px;
}

:deep(.el-input__wrapper) {
    flex-grow: 0;
}
</style>
