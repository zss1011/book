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
                书籍
            </div>
        </div>
        <div class="footer">footer</div>
    </div>
</template>

<script setup lang="js">
import {Calendar, Search} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {getBookTypeConfigApi} from '@/api/systemConfigApi.js'
import {bookPageApi} from "@/api/bookApi.js";

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
    const {data} = await bookPageApi(searchBookPageDTO)
    console.log(data)
    books.value = data.records;
    console.log(books.value);
}

const searchBookPageDTO = reactive({
    bookName: null,
    bookType: null,
    current: 1,
    size: 10,
})

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
        justify-content:space-between;
        flex-wrap: wrap;

        .book{
            height: 300px;
            //background-color: skyblue;
            flex-basis: 25%;
            padding: 25px 25px 25px 25px;
            box-sizing: border-box;
        }
    }

    .footer {
        background-color: #8c939d;
        height: 120px;
    }

    :deep {
        .el-input__wrapper.is-focus {
            box-shadow: 0 0 0 1px black;
        }

        .el-input__wrapper {
            background-color: rgb(248, 248, 248);
        }
    }
}

</style>
