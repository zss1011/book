<template>
    <div class="book-container">
        <div class="header">
            <el-input v-model="pageDTO.bookName" @keyup.enter="onEnterBookSearch" placeholder="书名" style="margin-left: 20px">
                <template #append>
                    <el-button :icon="Search" @click="handleBookSearch" />
                </template>
            </el-input>
            <el-button @click="handleDialog" type="success" style="margin-right: 60px">新增书籍</el-button>
            <el-dialog v-model="dialogVisible" style="width: 36%">
                <div class="add-book-dialog">
                    <div class="header">新增书籍</div>
                    <div class="content">
                        <el-form :model="book" :rules="rules" ref="ruleFormRef" class="form-item-content">
                            <div class="left">
                                <div style="margin-bottom: 10px; color: #9f9f9f">书籍封面</div>
                                <el-form-item prop="cover">
                                    <el-upload class="avatar-uploader"
                                               :http-request="uploadFile"
                                               :show-file-list="false"
                                               :on-success="handleAvatarSuccess"
                                    >
                                        <img v-if="previewImgUrl" :src="previewImgUrl" class="avatar" />
                                        <el-icon v-else class="avatar-uploader-icon">
                                            <Plus />
                                        </el-icon>
                                    </el-upload>
                                </el-form-item>
                                <div style="color: #9f9f9f">*书架</div>
                                <el-form-item prop="bookrack">
                                    <el-select v-model="book.bookrack" placeholder="请选择" clearable style="width: 240px">
                                        <el-option v-for="item in bookrackConfigOptions" :key="item.value" :label="item.label" :value="item.value" />
                                    </el-select>
                                </el-form-item>
                                <div style="color: #9f9f9f">*书籍类别</div>
                                <el-form-item prop="type">
                                    <el-select v-model="book.type" placeholder="请选择" style="width: 240px">
                                        <el-option v-for="item in bookTypeConfigs" :key="item.value" :label="item.label" :value="item.value" />
                                    </el-select>
                                </el-form-item>
                                <div style="color: #9f9f9f">上线只需要设置为未预售即可</div>
                                <div style="color: #9f9f9f">*是否为预售书籍(预售才选)</div>
                                <el-form-item>
                                    <el-switch v-model="bookStatus" style="--el-switch-off-color: rgb(221, 223, 230)" />
                                </el-form-item>
                                <div style="color: #9f9f9f">*计划上架时间(预售才选)</div>
                                <el-form-item prop="addedDate">
                                    <el-date-picker
                                        type="date"
                                        placeholder="计划上架时间"
                                        v-model="book.addedDate"
                                        :disabled="!bookStatus"
                                    />
                                </el-form-item>
                                <div style="color: #9f9f9f">馆藏数目</div>
                                <el-form-item>
                                    <el-input-number v-model="book.number" :min="1" :max="10" />
                                </el-form-item>
                            </div>
                            <div class="right">
                                <div style="color: #9f9f9f">书籍名称</div>
                                <el-form-item prop="name" style="margin-bottom: 15px">
                                    <el-input v-model="book.name" placeholder="输入" style="height: 60px; font-size: 24px"></el-input>
                                </el-form-item>
                                <div style="color: #9f9f9f">出版商</div>
                                <el-form-item prop="publishers">
                                    <el-input v-model="book.publishers" placeholder="输入" style="height: 60px; font-size: 24px"></el-input>
                                </el-form-item>
                                <div style="color: #9f9f9f">作者</div>
                                <el-form-item prop="author">
                                    <el-input v-model="book.author" placeholder="输入" style="height: 60px; font-size: 24px"></el-input>
                                </el-form-item>
                                <div style="color: #9f9f9f">国际标准书号(ISBN)</div>
                                <el-form-item prop="bookNo">
                                    <el-input v-model="book.bookNo" placeholder="输入" style="height: 60px; font-size: 24px"></el-input>
                                </el-form-item>
                                <div style="color: #9f9f9f">书籍简介</div>
                                <el-form-item prop="bookInfo">
                                    <el-input v-model="book.bookInfo" type="textarea" placeholder="书籍简介" style="height: 50px"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>

                    <div class="footer">
                        <template v-if="isAddMode">
                            <el-button type="info" @click="handleCloseDialog">取消操作</el-button>
                            <el-button type="success" @click="handleAddBook(ruleFormRef)">确定新增</el-button>
                        </template>
                        <template v-else>
                            <el-button type="info" @click="handleCloseDialog">取消操作</el-button>
                            <el-button type="success" @click="handleConfirmUpdateBook">确定修改</el-button>
                        </template>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="body">
            <div class="book-item" v-for="book in books" :key="book.id">
                <div class="book-cover">
                    <img :src="book.previewUrl" style="width: 80%; height: auto">
                </div>
                <div class="book-name" :title="book.name">
                    {{ book.name }}
                </div>
                <div class="book-category">
                    <template v-if="book.status === 1">
                        <Symbol class="symbol" />
                        <span>预售书籍</span>
                    </template>
                    <template v-if="book.status === 2">
                        <Choose class="choose" />
                        <span>在售书籍</span>
                    </template>
                    <template v-if="book.status === 3">
                        <Error class="error" />
                        <span>已下架</span>
                    </template>
                    <span>小说</span>
                </div>
                <div class="publisher">
                    由【{{ book.publishers }}】出品
                </div>
                <div class="author">
                    <span style="margin-left: 20px">作者</span>
                    <span style="margin-left: 10px">{{ book.author }}</span>
                    <span>【库存{{ book.number }}】</span>
                </div>
                <div class="button">
                    <el-button type="info" size="small" @click="handleUpdateBook(book.id)">修改</el-button>
                    <el-button type="info" size="small" @click="handleDeleteBook(book.id)">删除</el-button>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-pagination
                layout=" prev, pager, next, total"
                :total="total"
                v-model:current-page="pageDTO.current"
                v-model:page-size="pageDTO.size"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {onMounted, ref, watch} from "vue";
import Symbol from '@/svg/感叹号.svg'
import Choose from '@/svg/choose.svg'
import Error from '@/svg/error.svg'
import {addBookApi, bookDetailApi, bookPageApi, deleteBookApi, updateBookApi} from "@/api/bookApi.js";
import {downloadFileApi, uploadFileApi as uploadFileApi} from '@/api/fileApi.js'
import {Plus, Search} from "@element-plus/icons-vue";
import {getBookrackConfigApi, getBookTypeConfigApi} from "@/api/systemConfigApi.js"
import dayjs from "dayjs";
import {ElMessage, ElMessageBox} from "element-plus";


// 页面数据：新增数据
const book = ref({
    status: null, // 书籍状态:1预售 2上架
    cover: null, // 书籍封面
    bookrack: null, // 书架
    type: null, // 书籍类别
    addedDate: null, // 上架时间
    number: 1, // 书籍数量
    name: null, // 书籍名称
    publishers: null, // 出版商
    author: null, // 作者
    bookNo: null, // 书号
    bookInfo: null, // 书籍简介
})
const ruleFormRef = ref()
const rules = {
    bookrack: [{required: true, message: '书架不能为空', trigger: 'change'}],
    type: [{required: true, message: '书籍类别不能为空', trigger: 'change'}],
    name: [{required: true, message: '书籍名不能为空', trigger: 'blur'}],
    cover: [{required: true, message: '封面不能为空', trigger: 'change'}],
    publishers: [{required: true, message: '出版商不能为空', trigger: 'blur'}],
    author: [{required: true, message: '作者不能为空', trigger: 'blur'}],
    bookNo: [{required: true, message: '书号不能为空', trigger: 'blur'}],
    bookInfo: [{required: true, message: '书籍简介不能为空', trigger: 'blur'}],
}

// 预售状态
const bookStatus = ref(false)
watch(bookStatus, (val) => {
    book.value.status = val ? 1 : 2;
}, {immediate: true})

// 书架配置
const bookrackConfigOptions = ref([])
// 书籍类别
const bookTypeConfigs = ref([])

// 上传图片
const uploadFile = async (option) => {
    const res = await uploadFileApi(option.file);
    book.value.cover = res.data
}
const previewImgUrl = ref('') // 图片预览url
const handleAvatarSuccess = async (response, uploadFile) => {
    previewImgUrl.value = await download(book.value.cover);
}

// 页面数据：分页数据
const total = ref(0)
const pageDTO = ref({
    current: 1,
    size: 12,
    bookName: null,
    bookrack: null,
})

// 书籍
const books = ref([])
onMounted(async () => {
    // 分页查询书籍
    await queryBookPage();
    // 查询:书架配置
    await getBookrackConfigOptions();
    // 查询:书籍类别
    await getBookTypeConfig();
})

// 查询:书籍类别
const getBookTypeConfig = async () => {
    const bookTypeConfigRes = await getBookTypeConfigApi();
    for (let config of bookTypeConfigRes.data) {
        bookTypeConfigs.value.push({label: config, value: config})
    }
}

// 查询:书架配置
const getBookrackConfigOptions = async () => {
    const bookrackConfigRes = await getBookrackConfigApi()
    for (let config of bookrackConfigRes.data) {
        bookrackConfigOptions.value.push({label: config, value: config})
    }
}

// 查询数据
const handleBookSearch = async () => {
    await queryBookPage();
}
const onEnterBookSearch = async () => {
    await handleBookSearch();
}

// 分页查询
const handlePageChange = async (current, size) => {
    pageDTO.value.current = current;
    pageDTO.value.size = size;
    await queryBookPage();
}

// pagination分页查询
const queryBookPage = async () => {
    const bookPageRes = await bookPageApi(pageDTO.value)
    books.value = bookPageRes.data.records;
    total.value = bookPageRes.data.total;
    for (let bookItem of books.value) {
        bookItem.previewUrl = await download(bookItem.cover);
    }
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 对话框
const dialogVisible = ref(false)
const handleDialog = () => {
    dialogVisible.value = !dialogVisible.value
    isAddMode.value = true
    book.value = {}
    previewImgUrl.value = ''
    console.log(book.value)
}
const handleCloseDialog = () => {
    dialogVisible.value = false
}
// 确定修改:书籍
const handleConfirmUpdateBook = async () => {
    if (book.value.addedDate) {
        book.value.addedDate = dayjs(book.value.addedDate).format("YYYY-MM-DD HH:mm:ss");
    }
    await updateBookApi(book.value);
    dialogVisible.value = false
    await queryBookPage();
}
// 新增书籍
const handleAddBook = async (formEl) => {
    if (book.value.addedDate) {
        book.value.addedDate = dayjs(book.value.addedDate).format("YYYY-MM-DD HH:mm:ss");
    }
    // 表单校验
    try {
        await formEl.validate() // 如果校验失败，这里会 throw
    } catch (err) {
        console.log('表单校验不通过:', err)
        return
    }
    await addBookApi(book.value)
    clearBook();
    dialogVisible.value = false
}
const clearBook = () => {
    book.value = {
        status: null,
        cover: null,
        bookrack: null,
        type: null,
        addedDate: null,
        number: 1,
        name: null,
        publishers: null,
        author: null,
        bookNo: null,
        bookInfo: null,
    }
    bookStatus.value = true
    previewImgUrl.value = null
}

// 删除书籍
const handleDeleteBook = async (bookId) => {
    try {
        await ElMessageBox.confirm('是否要删除?', '警告', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
        });
        await deleteBookApi(bookId);
        await queryBookPage();
        ElMessage.success('删除成功');
    } catch {
        ElMessage.info('取消成功');
    }
}
// 修改书籍
const isAddMode = ref(true)
const handleUpdateBook = async (bookId) => {
    dialogVisible.value = true;
    isAddMode.value = false
    // 查询:书籍详情
    const bookDetailRes = await bookDetailApi(bookId);
    book.value = bookDetailRes.data
    previewImgUrl.value = await download(book.value.cover);
    bookStatus.value = book.value.status === 1;
}

</script>

<style scoped lang="scss">
.book-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .header {
        width: 100%;
        height: 50px;
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        align-items: center;
        padding-left: 10px;

        .add-book-dialog {
            .header {
                font-size: 30px;
                color: gray;
            }

            .content {
                .form-item-content {
                    display: flex;

                    :deep(.el-input__wrapper) {
                        flex-grow: 1 !important;
                    }

                    .el-form-item {
                        margin-bottom: 10px;
                    }

                    .left {
                        min-height: 60vh;
                        min-width: 300px;
                        align-content: center;

                        .avatar-uploader .avatar {
                            width: 90px;
                            height: 90px;
                            display: block;
                        }
                    }

                    .right {
                        flex-grow: 1;
                        align-content: center;
                    }
                }

            }
        }

    }

    .body {
        flex-shrink: 1;
        overflow: auto;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-left: 30px;


        .book-item {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 330px;
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: calc((100% - 16px * 5) / 6);
            min-width: 0;
            gap: 3px;
            background-color: #f7f7f7;
            padding: 3px;
            box-sizing: border-box;

            .book-category {
                display: flex;
                justify-content: center;
                gap: 5px;
                font-size: 14px;

                .symbol {
                    width: 14px;
                    height: auto;
                }

                .choose {
                    width: 14px;
                    height: auto;
                }

                .error {
                    width: 14px;
                    height: auto;
                }
            }

            .publisher {
                display: flex;
                justify-content: center;
                font-size: 14px;
            }

            .author {
                display: flex;
                justify-content: center;
                font-size: 14px;
            }

            .book-cover {
                display: flex;
                justify-content: center;
                height: 200px;
            }

            .book-name {
                width: 100%;
                height: 20px;
                line-height: 20px;
                font-size: 20px;
                font-weight: bolder;
                overflow: hidden;
                text-align: center;
                min-width: 0; /* 关键：允许自身收缩 */
                white-space: nowrap; /* 🚩单行 */
                text-overflow: ellipsis; /* 🚩溢出省略号 */
            }

            .button {
                display: flex;
                justify-content: center;
            }
        }
    }

    .footer {
        width: 100%;
        min-height: 65px;
        flex-shrink: 0;
        flex-grow: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

:deep(.el-input__wrapper) {
    flex-grow: 0 !important;
}

:deep(.el-form-item__content) {
    margin-bottom: 12px !important;
}
</style>
