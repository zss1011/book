<template>
    <div class="notice-detail-container">
        <div class="wrapper">
            <div class="title" style="margin-bottom: 30px">
                <el-input v-model="title" placeholder="标题" />
            </div>
            <div class="editor">
                <div style="border: 1px solid #ccc">
                    <Toolbar
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                    />
                    <Editor
                        style="height: 450px"
                        v-model="valueHtml"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="handleCreated"
                    />
                </div>
            </div>
            <div class="buttons">
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleClose">关闭</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, onMounted, ref, shallowRef, watch} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {downloadFileApi, uploadFileApi} from "@/api/fileApi.js";
import {useUserStore} from "@/store/useUserStore.js";
import {createRichTextApi, richTextDetailApi, updateRichTextApi} from "@/api/richTextApi.js";
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";

const userStore = useUserStore();
const route = useRoute()


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
let mode = 'default'

const title = ref('')

// 内容 HTML
const valueHtml = ref('')


setInterval(() => {
}, 3000)

const toolbarConfig = {}

const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
}

// 上传视频
editorConfig.MENU_CONF['uploadVideo'] = {
    // 自定义上传
    async customUpload(file, insertFn) {
        const res = await uploadFileApi(file)
        console.log(res)
        let videoId = res.data
        // 视频播放与图片预览一样，转成临时在线播放地址
        const videoUrl = await download(videoId);
        insertFn(videoUrl, 'https://picx.zhimg.com/80/v2-0c8c28a20d638cbe8dc7981418d8d0e4_720w.webp?source=1def8aca')
    },
}


// 图片地址与预览url
const previewUrlMap = new Map();

editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    async customUpload(file, insertFn) {
        const res = await uploadFileApi(file)
        const fileId = res.data;
        // 临时将blob转成浏览器可现实的url
        const imageUrl = await download(res.data);
        insertFn(imageUrl)
        previewUrlMap.set("fileId:" + fileId, imageUrl);
    }
}


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

// 文件下载
const download = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}

watch(() => route.query.id, async (val) => {
    // richTextId = val;
    // const res = await richTextDetailApi(richTextId)
    // valueHtml.value = await replaceFileId(res.data.content);
    // title.value = res.data.title
})

setInterval(async () => {

}, 3000)

onMounted(async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    richTextId = route.query.id;
    // 暂停1秒
    const res = await richTextDetailApi(richTextId)
    valueHtml.value = await replaceFileId(res.data.content);
    title.value = res.data.title
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
        previewUrlMap.set(fileId, res);
        resultText = text.replace(fileId, res)
        text = resultText
    }
    return resultText;
}

// 保存or更新
let richTextId = null;
const handleSave = async () => {
    // 替换图片临时地址
    for (let [key, value] of previewUrlMap) {
        valueHtml.value = valueHtml.value.replace(value, key);
    }
    // 保存or更新富文本
    if (richTextId === null) {
        let res = await saveRichText(valueHtml.value);
        richTextId = res.data.id;
    } else {
        await updateRichText(valueHtml.value);
    }

    // 将fileId:xxx转换成临时预览
    for (let [key, value] of previewUrlMap) {
        valueHtml.value = valueHtml.value.replace(key, value);
    }
    ElMessage({
        message: '保存成功',
        type: 'success',
    })
}

// 关闭
const router = useRouter();
const handleClose = async () => {
    await router.push('/notice');
}


// 发送请求:保存富文本
const saveRichText = async (valueHtml) => {
    const data = {
        userId: userStore.user.value.id,
        title: title.value,
        content: valueHtml
    }
    return await createRichTextApi(data)
}
const updateRichText = async (valueHtml) => {
    const data = {
        id: richTextId,
        title: title.value,
        content: valueHtml
    }
    await updateRichTextApi(data);
}

</script>

<style scoped lang="scss">
.notice-detail-container {
    max-width: 100%;
    height: 1200px;
    display: flex;
    justify-content: center;

    .wrapper {
        display: flex;
        justify-content: flex-start;
        max-width: 80vw;
        width: 100%;
        height: 900px;
        overflow: auto;
        padding-top: 20px;
        flex-direction: column;

        .editor {
            width: 100%;
            height: 500px;
        }

        .buttons {
            padding: 10px;
            display: flex;
            justify-content: center;
        }
    }


}

:deep(.el-input__wrapper) {
    height: 50px;
    font-size: 24px;
}
</style>
