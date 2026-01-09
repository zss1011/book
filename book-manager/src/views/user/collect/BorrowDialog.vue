<template>
    <div class="borrow-dialog-container">
        <el-dialog v-model="visible" width="300">
            <el-form ref="borrowFormRef" :model="borrowForm" :rules="rules" class="borrow-form">
                <el-form-item label="借书数量" label-position="top" required>
                    <el-input-number v-model="borrowForm.borrowCount" :min="0" :max="bookNumber" class="form-item-content" />
                </el-form-item>
                <el-form-item label="归还日期" label-position="top" prop="returnTime" required>
                    <el-date-picker
                        v-model="borrowForm.returnTime"
                        type="date"
                        placeholder="选择日期"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="handleCancel">取消操作</el-button>
                    <el-button type="primary" @click="handleBorrow">确定借阅</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="js">
import {computed, reactive, ref, watch} from "vue";
import {bookDetailApi} from "@/api/bookApi.js";
import {ElMessage} from "element-plus";
import {userBookOperationApi} from "@/api/userBookRelationApi.js";
import {useUserStore} from "@/store/useUserStore.js";
import dayjs from "dayjs";
import {DATE_TIME_FORMAT} from "@/utils/dateFormat.js";

const {user} = useUserStore();

const emit = defineEmits(['update:dialogVisible'])
const props = defineProps({
    dialogVisible: Boolean,
    selectBookId: String,
})

const visible = computed({
    get: () => props.dialogVisible,
    set: val => emit("update:dialogVisible", val),
})

const bookNumber = ref(0)
const borrowForm = reactive({
    bookId: '',
    borrowCount: 0,
    returnTime: null,
})
const borrowFormRef = ref(null)

watch(() => props.selectBookId, async (val) => {
    borrowForm.bookId = val;
    const {data} = await bookDetailApi(val)
    bookNumber.value = data.number
})

const handleCancel = async () => {
    visible.value = false
}

const handleBorrow = async () => {
    try {
        await borrowFormRef.value.validate();
        await executeBorrowBook();
        visible.value = false
        window.location.reload();
    } catch (e) {
        ElMessage({message: '归还日期不能为空', type: "error"})
    }
}

const executeBorrowBook = async () => {
    const body = {
        userId: user.value.id,
        bookId: borrowForm.bookId,
        operation: true,
        type: 3,
        borrowCount: borrowForm.borrowCount,
        returnTime: dayjs(borrowForm.returnTime).format(DATE_TIME_FORMAT),
    }
    await userBookOperationApi(body);
}

const rules = {
    returnTime: [{required: true, message: '归还日期不能为空', trigger: "blur"}],
}
</script>

<style scoped lang="scss">
.borrow-dialog-container {
    .borrow-form {
        .form-item-content {
            width: 100%;
        }
    }

    .dialog-footer {
        display: flex;
        justify-content: center;
    }
}

:deep(.el-date-editor) {
    width: 100%;
}
</style>
