<template>
    <div class="borrow-container">
        <div class="header">
            <div class="search">
                <el-input class="search-input" placeholder="搜索书籍" v-model="searchBookPageDTO.bookName" @keyup.enter="handleSearch()">
                    <template #suffix>
                        <el-icon class="search-icon" @click="handleSearch()">
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </div>
            <div class="book-type">
                <div class="book-type-item" :class="{'book-type-item-active' : activeBookTypeIndex === index}"
                     v-for="(bookType, index) in bookTypes" :key="index"
                     @click="handleSelectBookType(index, bookType)">
                    {{ bookType }}
                </div>
            </div>
        </div>
        <div class="content">
            <div v-for="(book, index) in books" :key="book.id" class="book">
                <div class="cover">
                    <el-image class="cover-img" :src="book.previewUrl" fit="cover" />
                </div>
                <div class="book-info">
                    <el-tooltip :content="book.name" placement="top" :show-after="300" effect="light">
                        <div class="title">{{ book.name }}</div>
                    </el-tooltip>
                    <div class="status">
                        <div class="status-item" v-if="book.status === 1">
                            <el-icon class="status-icon">
                                <WarningFilled />
                            </el-icon>
                            <span>预售书籍</span>
                        </div>
                        <div class="status-item" v-else-if="book.status === 2">
                            <el-icon class="status-icon">
                                <CircleCheckFilled class="putaway"/>
                            </el-icon>
                            <span>书籍已上架</span>
                        </div>
                        <div class="status-item" v-else>
                            <el-icon class="status-icon">
                                <CircleCloseFilled class="out-of-stock"/>
                            </el-icon>
                            <span>书籍已下架</span>
                        </div>
                        <div>-{{ book.type }}</div>
                    </div>
                    <div class="publishers">由【{{ book.publishers }}】出版</div>
                    <div class="author">作者：{{ book.author }}</div>
                    <div v-if="book.status === 1">
                        <el-button type="info" size="small">订阅</el-button>
                    </div>
                    <div v-if="book.status === 2">
                        <el-button type="info" size="small">收藏</el-button>
                        <el-button type="info" size="small">借书</el-button>
                    </div>
                    <div v-if="book.status === 3">
                        <el-button type="info" size="small">收藏</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <el-pagination
                v-model:current-page="searchBookPageDTO.current"
                v-model:page-size="searchBookPageDTO.size"
                layout="prev,pager,next, jumper, total,sizes"
                :total="searchBookPageDTO.total"
                :page-sizes="[4, 8, 12]"
                @change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup lang="js">
import {CircleCheckFilled, CircleCloseFilled, Search, WarningFilled} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {getBookTypeConfigApi} from '@/api/systemConfigApi.js'
import {bookPageApi} from "@/api/bookApi.js";
import {downloadFileApi} from "@/api/fileApi.js"

const bookTypes = ref([])
onMounted(async () => {
    await initBookTypes();
    await handleSearch();
})

// 初始化书籍类别
const initBookTypes = async () => {
    const {data} = await getBookTypeConfigApi();
    data.unshift('全部')
    bookTypes.value = data;
}
const activeBookTypeIndex = ref(0)

// 切换书籍类别
const handleSelectBookType = async (index, bookType) => {
    activeBookTypeIndex.value = index;
    searchBookPageDTO.bookType = bookType;
    await handleSearch();
}

// 搜索书籍
const books = ref([])
const handleSearch = async () => {
    const {data, total} = await bookPageApi(searchBookPageDTO)
    books.value = data.records;
    searchBookPageDTO.total = data.total;
    for (let book of books.value) {
        book.previewUrl = await download(book.cover)
    }
    console.log(books.value);
    console.log(searchBookPageDTO)
}

const searchBookPageDTO = reactive({
    bookName: null,
    bookType: null,
    current: 1,
    size: 8,
    total: 0,
})

// 文件预览
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

// 处理分页切换
const handlePageChange = async () => {
    await handleSearch();
}

</script>

<style scoped lang="scss">
.borrow-container {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
        height: 120px;
        display: flex;
        flex-direction: column;

        .search {
            display: flex;
            justify-content: center;
            padding-top: 30px;

            .search-input {
                width: 720px;
                height: 40px;

                .search-icon {
                    cursor: pointer;
                }
            }
        }

        .book-type {
            display: flex;
            justify-content: flex-start;
            padding-left: 30px;
            margin-top: 15px;
            gap: 5px;
            color: rgb(110, 112, 115);
            font-size: 14px;

            .book-type-item {
                cursor: pointer;
                padding: 5px 15px 5px 15px;
                border-radius: 6px;
            }

            .book-type-item-active {
                background-color: rgb(240, 242, 245);
            }
        }
    }

    .content {
        flex-grow: 1;
        overflow: auto;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .book {
            height: 390px;
            flex-basis: 25%;
            padding: 25px 25px 25px 25px;
            box-sizing: border-box;

            .cover {
                width: 80%;
                height: 250px;

                .cover-img {
                    width: 100%;
                    height: 100%;
                }
            }

            .book-info {
                padding-left: 50px;
                display: flex;
                flex-direction: column;
                gap: 3px;

                .title {
                    font-size: 20px;
                    font-weight: bold;
                    width: 200px;
                    white-space: nowrap; /* 不换行 */
                    overflow: hidden; /* 超出隐藏 */
                    text-overflow: ellipsis; /* 省略号 */
                }

                .status {
                    display: flex;
                    font-size: 12px;
                    color: gray;

                    .status-item {
                        display: flex;
                        gap: 5px;


                        .status-icon {
                            margin-top: 3px;
                            color: black;

                            .putaway{
                                color: gold;
                            }

                            .out-of-stock{
                                color: gray;
                            }
                        }
                    }
                }

                .publishers {
                    font-size: 12px;
                    color: gray;
                }

                .author {
                    font-size: 12px;
                    color: gray;
                }
            }
        }
    }

    .footer {
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :deep(.el-input__wrapper.is-focus ) {
        box-shadow: 0 0 0 1px black;
    }

    :deep(.el-input__wrapper) {
        background-color: rgb(248, 248, 248);
    }
}

</style>
