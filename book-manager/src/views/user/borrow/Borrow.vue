<template>
    <div class="borrow-container">
        <div class="header">
            <el-input v-model="pageQuery.bookName" @keyup.enter="handleSearch" class="book-name-input" placeholder="书籍名">
                <template #suffix>
                    <el-icon @click="handleSearch" class="book-name-input-icon">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="tableData" border class="table">
                <el-table-column prop="bookName" label="书籍" width="180" />
                <el-table-column prop="author" label="作者" width="180" />
                <el-table-column prop="returnTime" label="归还时间" width="180" />
                <el-table-column label="操作">
                    <template #default="{row}">
                        <el-button type="primary" size="small" @click="handleReturnBook(row.bookId)">归还</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
                <el-pagination
                    v-model:current-page="pageQuery.current"
                    v-model:page-size="pageQuery.size"
                    :page-sizes="[2,5,10]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageQuery.total"
                    @change="handlePageChange"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {userBookBorrowPageApi, userBookOperationApi} from "@/api/userBookRelationApi.js";
import {useUserStore} from "@/store/useUserStore.js";

const {user} = useUserStore();

const pageQuery = reactive({
    bookName: '',
    current: 1,
    size: 5,
    total: 0,
})

const tableData = ref([])

onMounted(async () => {
    await fetchTableData();
})

const fetchTableData = async () => {
    const body = {
        current: pageQuery.current,
        size: pageQuery.size,
        userId: user.value.id,
        bookName: pageQuery.bookName,
    }
    const {data} = await userBookBorrowPageApi(body)
    tableData.value = data.records
    pageQuery.total = data.total
}

const handleSearch = async () => {
    await fetchTableData();
}

const handlePageChange = async (current, size) => {
    pageQuery.current = current;
    pageQuery.size = size;
    await fetchTableData();
}

const handleReturnBook = async (bookId) => {
    const body = {
        userId: user.value.id,
        bookId: bookId,
        operation: false,
        type: 3,

    }
    await userBookOperationApi(body)
    await fetchTableData();
}

</script>

<style scoped lang="scss">
.borrow-container {
    .header {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;

        .book-name-input {
            width: 720px;
            height: 40px;

            .book-name-input-icon {
                cursor: pointer;
            }
        }
    }

    .content {
        display: flex;
        align-items: center;
        padding-top: 10px;
        flex-direction: column;

        .table {
            width: 40%;
        }

        .pagination-wrapper {
            margin-top: 20px;
        }
    }
}
</style>
