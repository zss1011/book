<template>
    <div class="bookrack-container">
        <div class="header">
            <div style="color: gray; margin-left: 10px">书架名</div>
            <el-input v-model="searchBookrack" placeholder="书架" style="width: 200px" />
            <el-button plain type="primary" @click="handleSearch">立即查询</el-button>
            <el-button plain type="primary" @click="handleAdd">新增书架</el-button>
        </div>
        <div class="body">
            <el-table :data="bookracks" style="width: 60%; margin: 20px 0 0 10px;" border max-height="600px">
                <el-table-column label="书架">
                    <template #default="{row}">
                        <template v-if="editId === row.id">
                            <el-input v-model="row.name" />
                        </template>
                        <template v-else>
                            {{ row.name }}
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{row}">
                        <template v-if="editId === row.id">
                            <el-button size="small" type="primary" plain @click="handleSave(row)">保存</el-button>
                            <el-button size="small" type="primary" plain @click="handleCancel(row)">取消</el-button>
                        </template>
                        <template v-else>
                            <el-button size="small" type="primary" plain @click="handleEdit(row)">编辑</el-button>
                            <el-button size="small" type="primary" plain @click="handleDelete(row)">删除</el-button>
                        </template>

                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, ref} from "vue";
import {deleteBookrackConfigApi, getBookrackConfigApi, updateBookrackConfigApi} from "@/api/systemConfigApi.js";
import {hasEmptyBookrack} from "@/components/js/bookrack.js";

// 页面数据
const bookracks = ref([])
const searchBookrack = ref('')

// 生命周期
onMounted(async () => {
    // 查询:书架配置
    await getBookracks();
})

// 查询:书架配置
const getBookracks = async () => {
    const bookracksRes = await getBookrackConfigApi()
    bookracks.value = [];
    for (let i = 0; i < bookracksRes.data.length; i++) {
        bookracks.value.push({
            id: i + 1,
            name: bookracksRes.data[i],
        })
    }
}
// 关键词搜索:书架
const handleSearch = async () => {
    await getBookracks();
    bookracks.value = bookracks.value.filter(x => x.name.includes(searchBookrack.value))
}

// 正在编辑的那行id
const editId = ref(null)
// 编辑:书架配置
const sourceBookrack = ref('')
const handleEdit = async (row) => {
    editId.value = row.id;
    sourceBookrack.value = bookracks.value.find(x => x.id === editId.value).name
}
// 修改、保存:书架
const handleSave = async (row) => {
    await updateBookrackConfigApi(sourceBookrack.value, row.name);
    editId.value = null;
    await getBookracks();
}
// 取消
const handleCancel = async (row) => {
    bookracks.value = bookracks.value.filter(x => x.id < 10000)
    editId.value = null;
}
// 删除:书架
const handleDelete = async (row) => {
    await deleteBookrackConfigApi(row.name)
    await getBookracks();
}
// 新增书架
const handleAdd = () => {
    // 是否已新增
    if (hasEmptyBookrack(bookracks.value)) {
        return;
    }
    const id = new Date().getTime();
    bookracks.value.unshift({id: id, name: ''})
    editId.value = id;
}
</script>

<style scoped lang="scss">
.bookrack-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .header {
        height: 80px;
        display: flex;
        align-items: center;
        gap: 10px;

        :deep(.el-button) {
            margin-left: 0;
        }
    }

    .body {
        flex-grow: 1;
    }

}
</style>
