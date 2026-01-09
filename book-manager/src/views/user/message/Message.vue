<template>
    <div class="message-container">
        <div class="header">
            <el-input class="search-input" v-model="pageQuery.bookName" @keyup.enter="handleSearch">
                <template #suffix>
                    <el-icon class="search-input-icon" @click="handleSearch">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
            <el-button class="search-button" color="rgb(249,249,249)" :dark="false" @click="handleReadAll">全部已读</el-button>
        </div>
        <div class="body">
            <el-table class="table" :data="tableData" border>
                <el-table-column prop="message" label="消息" width="540" />
                <el-table-column label="是否已读" width="180">
                    <template #default="{row}">
                        {{ row.readStatus === 1 ? '是' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="addedDate" label="推送时间" width="180" />
                <el-table-column label="操作">
                    <template #default="{row}">
                        <div>
                            <el-button type="primary" plain size="small" @click="handleRead(row.id)">阅读</el-button>
                            <el-button type="primary" plain size="small" @click="handleDelete(row.id)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="pageQuery.current"
                v-model:page-size="pageQuery.size"
                :page-sizes="[3, 5, 10]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageQuery.total"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, reactive, ref} from "vue";
import {deleteBookAddedMessageApi, readAllBookAddedMessageApi, readBookAddedMessageApi, subscriptionBookAddedPageApi} from "@/api/userBookRelationApi.js";
import {useUserStore} from "@/store/useUserStore.js";
import {Search} from "@element-plus/icons-vue";

const {user} = useUserStore();

const pageQuery = reactive({
    current: 1,
    size: 3,
    bookName: '',
    total: 0,
})
const tableData = ref([])

onMounted(async () => {
    await fetchTableData();
})

const fetchTableData = async () => {
    const body = {
        userId: user.value.id,
        bookName: pageQuery.bookName,
        current: pageQuery.current,
        size: pageQuery.size,
    }
    const {data} = await subscriptionBookAddedPageApi(body);
    tableData.value = data.records;
    pageQuery.total = data.total;
}

const handleSearch = async () => {
    await fetchTableData()
}

const handlePageChange = async () => {
    await fetchTableData()
}

const handleRead = async (id) => {
    await readBookAddedMessageApi(id)
    await fetchTableData()
}

const handleDelete = async (id) => {
    await deleteBookAddedMessageApi(id)
    await fetchTableData()
}

const handleReadAll = async () => {
    await readAllBookAddedMessageApi(user.value.id)
    await fetchTableData()
}


</script>

<style scoped lang="scss">
.message-container {
    .header {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .search-input {
            width: 500px;

            .search-input-icon {
                cursor: pointer;
            }
        }

        .search-button {
            color: gray;
        }
    }

    .body {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .table {
            width: 1200px;
        }
    }
}
</style>
