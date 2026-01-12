<template>
    <div class="notice-detail-container">
        <div class="notice-detail-wrapper">
            <div class="title" style="text-align: center; font-size: 24px; font-weight: bolder; margin-top: 10px;">{{title}}</div>
            <div v-html="content" class="content"></div>
        </div>
    </div>
</template>

<script setup lang="js">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {richTextDetailApi} from "@/api/richTextApi.js";
import {downloadFileApi} from "@/api/fileApi.js";

const route = useRoute()

// 公告内容
let title = ref('')
let content = ref('')

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let id = route.query.id;
    // 获取公告详情
    const res = await richTextDetailApi(id);
    title.value = res.data.bookName;
    // 处理图片预览
    content.value = await replaceFileId(res.data.content);
})

// 替换fileId
const replaceFileId = async (text) => {
    const regex = /fileId:([a-zA-Z0-9]+)/g;
    let fileIds = []
    let match;
    while ((match = regex.exec(text)) !== null) {
        fileIds.push('fileId:' + match[1])
    }
    let resultText = text;
    for (let fileId of fileIds) {
        let splits = fileId.split(':');
        // 下载文件，转换成临时预览目录
        const res = await download(splits[1]);
        resultText = text.replace(fileId, res)
        text = resultText
    }
    return resultText;
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

</script>

<style scoped lang="scss">
.notice-detail-container {
    height: 100vh;
    display: flex;
    justify-content: center;


    .notice-detail-wrapper {
        width: 99%;
        height: 90vh;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .content{
            width: 80%;
        }
    }
}
</style>
