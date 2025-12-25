<template>
    <div class="subscription-container">
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
                        <el-button plain size="small" type="primary" @click="handleCancel(row.bookId)">取消订阅</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination
                v-model:current-page="pageDTO.current"
                v-model:page-size="pageDTO.size"
                layout="prev,pager,next,jumper, total, sizes"
                :total="pageDTO.total"
                :page-sizes="[3, 5, 10]"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {Search} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {userBookOperationApi, userBookSubscriptionPageApi} from "@/api/userBookRelationApi.js";
import {useUserStore} from "@/store/useUserStore.js";

const {user} = useUserStore();

const pageDTO = reactive({
    bookName: null,
    current: 1,
    size: 5,
    total: 0,
    userId: user.value.id,
})

const pageVOS = ref([])

// 处理查询
const handleSearch = async () => {
    await executeSearch();
}

onMounted(async () => {
    await executeSearch();
})

const executeSearch = async () => {
    const {data} = await userBookSubscriptionPageApi(pageDTO)
    pageDTO.total = data.total
    pageVOS.value = data.records
}

// 取消订阅
const handleCancel = async (bookId) => {
    const body = {
        userId: user.value.id,
        bookId: bookId,
        operation: false,
        type: 1,
    }
    await userBookOperationApi(body)
    await executeSearch();
}
// 处理分页切换
const handlePageChange = async () => {
    await executeSearch();
}

</script>

<style scoped lang="scss">
.subscription-container {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
        background-color: skyblue;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;

        .search-input {
            width: 720px;
            height: 40px;

            .search-icon {
                cursor: pointer;
            }
        }
    }

    .content {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        .table {
            width: 60%;
        }
    }

    .footer {
        height: 120px;
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
