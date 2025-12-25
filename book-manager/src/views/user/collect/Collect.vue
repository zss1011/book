<template>
    <div class="collect-container">
        <div class="header">
            <el-input v-model="pageDTO.bookName" @keyup.enter="handleSearch()" class="search-input" placeholder="书籍名">
                <template #suffix>
                    <el-icon class="search-icon" @click="handleSearch()">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="pageVOS" class="table" stripe border max-height="600px">
                <el-table-column prop="bookName" label="书籍" width="180" />
                <el-table-column prop="author" label="作者" width="180" />
                <el-table-column prop="number" label="馆藏数" width="180" />
                <el-table-column prop="bookrack" label="书籍所在" width="180" />
                <el-table-column label="功能操作">
                    <template #default="{row}">
                        <el-button v-if="!row.borrowStatus" plain size="small" type="primary" @click="handleBorrow(row.bookId, true)">借阅</el-button>
                        <el-button v-else plain size="small" type="primary" @click="handleBorrow(row.bookId, false)">取消借阅</el-button>
                        <el-button plain size="small" type="primary" @click="handleCancelCollect(row.bookId)">取消收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                v-model:current-page="pageDTO.current"
                v-model:page-size="pageDTO.size"
                layout="prev,pager,next, jumper, total,sizes"
                :total="pageDTO.total"
                :page-sizes="[5, 10, 20]"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {Search} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {userBookOperationApi, userBookRelationPageApi} from "@/api/userBookRelationApi.js";
import {useUserStore} from "@/store/useUserStore.js";

const {user} = useUserStore()

const pageDTO = reactive({
    bookName: null,
    current: 1,
    size: 10,
    total: 0,
    userId: user.value.id,
})

const pageVOS = ref([])
onMounted(async () => {
    await executeSearchPage()
    console.log(pageVOS.value)
})

// 执行分页查询
const executeSearchPage = async () => {
    const {data} = await userBookRelationPageApi(pageDTO)
    pageDTO.total = data.total;
    pageVOS.value = data.records;
}

// 搜索已收藏书籍
const handleSearch = async () => {
    await executeSearchPage()
}

// 切换分页
const handlePageChange = async () => {
    await executeSearchPage()
}

// 取消收藏
const handleCancelCollect = async (bookId) => {
    const body = {
        userId: user.value.id,
        bookId: bookId,
        operation: false,
        type: 2,
    }
    await userBookOperationApi(body)
    await executeSearchPage();
}

// 处理书籍借阅
const handleBorrow = async (bookId, operation) => {
    const body = {
        userId: user.value.id,
        bookId: bookId,
        operation: operation,
        type: 3,
    }
    await userBookOperationApi(body)
    await executeSearchPage();
}

</script>

<style scoped lang="scss">
.collect-container {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;

        .search-input {
            width: 720px;
            height: 40px;

            .search-icon {
                color: black;
                cursor: pointer;
            }
        }
    }

    .content {
        overflow: auto;
        display: flex;
        justify-content: center;
        height: 600px;
        align-items: center;

        .table {
            width: 60%;
            margin-top: 20px;
        }
    }

    .footer {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }

    :deep(.el-input__wrapper.is-focus ) {
        box-shadow: 0 0 0 1px black;
    }

    :deep(.el-input__wrapper) {
        background-color: rgb(248, 248, 248);
    }
}
</style>
