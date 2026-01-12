<template>
    <div class="subscription">
        <div class="header">
            <div class="name">订阅时间</div>
            <div class="date-picker-wrap">
                <el-date-picker
                    class="date-picker"
                    v-model="queryPage.subscriptionTimeScope"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    @change="handleDateChange"
                />
            </div>
            <div class="btn-wrap">
                <el-button type="primary" size="default" plain @click="handleSearch">立即查询</el-button>
            </div>
        </div>
        <div class="content">
            <el-table class="table" :data="tableData" border max-height="300px">
                <el-table-column prop="bookName" label="图书" width="180"/>
                <el-table-column prop="number" label="馆藏数" width="180"/>
                <el-table-column prop="author" label="作者" width="180"/>
                <el-table-column prop="bookrack" label="馆藏区" width="180"/>
                <el-table-column prop="subscriptionRealName" label="订阅者" width="180"/>
                <el-table-column prop="createTime" label="订阅时间"/>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                v-model:current-page="queryPage.current"
                v-model:page-size="queryPage.size"
                :page-sizes="[5, 10, 15, 20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="queryPage.total"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, reactive, ref} from "vue";
import dayjs from "dayjs";
import {DATE_TIME_FORMAT} from "@/utils/dateFormat.js";
import {adminUserBookSubscriptionPageApi} from "@/api/userBookRelationApi.js";

const queryPage = reactive({
    current: 1,
    size: 5,
    subscriptionTimeScope: [],
    startTime: null,
    endTime: null,
    total: 0,
})
const tableData = ref([])

const handleDateChange = async () => {
    if (queryPage?.subscriptionTimeScope?.length === 2) {
        queryPage.startTime = dayjs(queryPage.subscriptionTimeScope[0]).format(DATE_TIME_FORMAT)
        queryPage.endTime = dayjs(queryPage.subscriptionTimeScope[1]).format(DATE_TIME_FORMAT)
    }
}

onMounted(async () => {
    await fetchTableData();
})

const fetchTableData = async () => {
    const {data} = await adminUserBookSubscriptionPageApi(queryPage)
    queryPage.total = data.total
    tableData.value = data.records
    console.log(tableData.value)
}

const handleSearch = async () => {
    await fetchTableData();
}

const handlePageChange = async () => {
    await fetchTableData();
}

</script>

<style scoped lang="scss">
.subscription {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        height: 80px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 20px;

        .name {
            color: rgb(89, 87, 87);
        }

        .date-picker-wrap {
            .date-picker {
            }
        }
    }

    .content {
        height: 300px;
        padding-left: 20px;
        .table{
            width: 70%;
        }
    }

    .footer {
        flex-grow: 1;
        padding-left: 200px;
    }
}

:deep(.el-date-editor ) {
    max-width: 200px;
}

</style>
