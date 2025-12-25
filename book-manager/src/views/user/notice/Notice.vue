<template>
    <div class="notice-container">
        <div class="header">
            <el-input v-model="pageDTO.title" @keyup.enter="handleSearch()" class="search-input" placeholder="标题">
                <template #suffix>
                    <el-icon class="search-icon" @click="handleSearch()">
                        <Search />
                    </el-icon>
                </template>
            </el-input>
        </div>
        <div class="content">
            <el-table :data="pageVOS" class="table" stripe border max-height="600px">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="createTime" label="发布时间" width="180" />
                <el-table-column label="功能操作">
                    <template #default="{row}">
                        <el-button plain size="small" type="primary" @click="handleReadNotice(row.id)">阅读</el-button>
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
import {onMounted, reactive, ref} from "vue";
import {richTextPageApi} from "@/api/richTextApi.js";
import {Search} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const router = useRouter();

const pageDTO = reactive({
    title: null,
    current: 1,
    size: 5,
    total: 0,
})
const pageVOS = ref([])

onMounted(async () => {
    await executeSearch();
})

const executeSearch = async () => {
    const {data} = await richTextPageApi(pageDTO)
    pageDTO.total = data.total;
    pageVOS.value = data.records;
    console.log(data)
}

const handleSearch = async () => {
    await executeSearch();
}

const handlePageChange = async () => {
    await executeSearch();
}

// 阅读公告
const handleReadNotice = async (id) => {
    const url = router.resolve({
        path: '/notice/detail',
        query: {id: id}
    })
    window.open(url.href, '_blank')
}

</script>

<style scoped lang="scss">
.notice-container {
    display: flex;
    flex-direction: column;

    .header {
        height: 120px;
        background-color: skyblue;
        display: flex;
        justify-content: center;
        align-items: center;

        .search-input {
            width: 720px;
            height: 40px;

            .search-icon {
                cursor: pointer;
            }
        }
    }

    .content {
        display: flex;
        justify-content: center;
        margin-top: 20px;

        .table {
            width: 40%;
        }
    }

    .footer {
        margin-top: 60px;
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
