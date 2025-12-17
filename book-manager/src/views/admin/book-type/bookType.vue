<template>
    <div class="book-type-container">
        <div class="header">
            <div style="color: gray">类别名</div>
            <el-input placeholder="书籍类别名" v-model="bookTypeSearch" style="width: 200px" />
            <el-button plain type="primary" @click="handleBookTypeSearch">立即查询</el-button>
            <el-button plain type="primary" @click="handleAddBookType">新增书籍类别</el-button>
        </div>
        <div class="body">
            <div class="book-type-wrapper" style="margin-top: 2px; margin-left: 10px; height: 300px;">
                <el-table :data="bookTypes" style="width: 60%" border max-height="600px">
                    <el-table-column label="书籍类别名">
                        <template #default="{row}">
                            <template v-if="editNameId === row.id">
                                <el-input v-model="row.name" size="default" />
                            </template>
                            <template v-else>
                                {{ row.name }}
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="{row}">
                            <template v-if="editNameId === row.id">
                                <el-button type="primary" size="small" plain @click="saveBookType(row)">保存</el-button>
                                <el-button type="primary" size="small" plain @click="cancelEdit">取消</el-button>
                            </template>
                            <template v-else>
                                <el-button type="primary" size="small" plain @click="startEdit(row)">编辑</el-button>
                                <el-button type="primary" size="small" plain @click="deleteBookType(row)">删除</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import {addBookTypeConfigApi, deleteBookTypeConfigApi, getBookTypeConfigApi, updateBookTypeConfigApi} from "@/api/systemConfigApi.js";
import {hasEmptyBookType} from "@/components/js/bookType.js";

// 页面数据:书籍类别
const bookTypes = ref([])

// 正在编辑的那一行
const editNameId = ref(null)

// 生命周期
onMounted(async () => {
    // 查询书籍类别
    await getBookTypes();
})

// 查询书籍类别
const sourceBookTypes = ref([])
const getBookTypes = async () => {
    const bookTypesRes = await getBookTypeConfigApi()
    let id = 1;
    for (let bookType of bookTypesRes.data) {
        bookTypes.value.push({
            id: id,
            name: bookType
        })
        id += 1;
    }
    sourceBookTypes.value = JSON.parse(JSON.stringify(bookTypes.value))
}

// 开始编辑
const startEdit = (row) => {
    editNameId.value = row.id;
}
// 取消编辑
const cancelEdit = () => {
    editNameId.value = null;
    bookTypes.value = bookTypes.value.filter(x => {
        return x.id < 10000;
    })
}
// 新增书籍类别
const handleAddBookType = () => {
    // 判断是否已新增过
    if (hasEmptyBookType(bookTypes.value)) {
        return
    }
    const id = new Date().getTime();
    bookTypes.value.unshift({id: id, name: ''})
    editNameId.value = id;
}

// 保存书籍类别
const saveBookType = async (row) => {
    if (row.name === '') {
        bookTypes.value = bookTypes.value.filter(x => x.id < 10000)
        return
    }
    if (row.id >= 100000) {
        // 新增
        await addBookTypeConfigApi(row.name);
        bookTypes.value = [];
        await getBookTypes();
        editNameId.value = null;
        return
    }
    const sourceBookType = sourceBookTypes.value.find(x => x.id === row.id);

    await updateBookTypeConfigApi(sourceBookType.name, row.name);
    bookTypes.value = [];
    await getBookTypes();
    editNameId.value = null;
}
// 删除:书籍类别
const deleteBookType = async (row) => {
    await deleteBookTypeConfigApi(row.name);
    bookTypes.value = [];
    await getBookTypes();
}

// 搜索:书籍类别
const bookTypeSearch = ref('')
const handleBookTypeSearch = async () => {
    if (bookTypeSearch.value === '') {
        bookTypes.value = [];
        await getBookTypes();
    }
    bookTypes.value = bookTypes.value.filter(x => {
        return x.name.includes(bookTypeSearch.value)
    })
}
</script>


<style scoped lang="scss">
.book-type-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        min-height: 80px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-left: 10px;

        :deep(.el-button) {
            margin-left: 0;
        }
    }

    .body {
        flex-grow: 1;
    }
}
</style>
