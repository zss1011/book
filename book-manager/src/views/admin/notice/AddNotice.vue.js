"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@wangeditor/editor/dist/css/style.css"); // 引入 css
const vue_1 = require("vue");
const editor_for_vue_1 = require("@wangeditor/editor-for-vue");
const fileApi_js_1 = require("@/api/fileApi.js");
const useUserStore_js_1 = require("@/store/useUserStore.js");
const richTextApi_js_1 = require("@/api/richTextApi.js");
const element_plus_1 = require("element-plus");
const vue_router_1 = require("vue-router");
const userStore = (0, useUserStore_js_1.useUserStore)();
const route = (0, vue_router_1.useRoute)();
// 编辑器实例，必须用 shallowRef
const editorRef = (0, vue_1.shallowRef)();
let mode = 'default';
const title = (0, vue_1.ref)('');
// 内容 HTML
const valueHtml = (0, vue_1.ref)('');
setInterval(() => {
}, 3000);
const toolbarConfig = {};
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {}
};
// 上传视频
editorConfig.MENU_CONF['uploadVideo'] = {
    // 自定义上传
    customUpload(file, insertFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, fileApi_js_1.uploadFileApi)(file);
            console.log(res);
            let videoId = res.data;
            // 视频播放与图片预览一样，转成临时在线播放地址
            const videoUrl = yield download(videoId);
            insertFn(videoUrl, 'https://picx.zhimg.com/80/v2-0c8c28a20d638cbe8dc7981418d8d0e4_720w.webp?source=1def8aca');
        });
    },
};
// 图片地址与预览url
const previewUrlMap = new Map();
editorConfig.MENU_CONF['uploadImage'] = {
    // 自定义上传
    customUpload(file, insertFn) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, fileApi_js_1.uploadFileApi)(file);
            const fileId = res.data;
            // 临时将blob转成浏览器可现实的url
            const imageUrl = yield download(res.data);
            insertFn(imageUrl);
            previewUrlMap.set("fileId:" + fileId, imageUrl);
        });
    }
};
// 组件销毁时，也及时销毁编辑器
(0, vue_1.onBeforeUnmount)(() => {
    const editor = editorRef.value;
    if (editor == null)
        return;
    editor.destroy();
});
const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    return URL.createObjectURL(blob);
});
(0, vue_1.watch)(() => route.query.id, (val) => __awaiter(void 0, void 0, void 0, function* () {
    // richTextId = val;
    // const res = await richTextDetailApi(richTextId)
    // valueHtml.value = await replaceFileId(res.data.content);
    // title.value = res.data.title
}));
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
}), 3000);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(resolve, 300));
    richTextId = route.query.id;
    // 暂停1秒
    const res = yield (0, richTextApi_js_1.richTextDetailApi)(richTextId);
    valueHtml.value = yield replaceFileId(res.data.content);
    title.value = res.data.title;
}));
// 替换fileId
const replaceFileId = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = /fileId:([a-zA-Z0-9]+)/g;
    let fileIds = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
        fileIds.push('fileId:' + match[1]);
    }
    let resultText = text;
    for (let fileId of fileIds) {
        let splits = fileId.split(':');
        // 下载文件，转换成临时预览目录
        const res = yield download(splits[1]);
        previewUrlMap.set(fileId, res);
        resultText = text.replace(fileId, res);
        text = resultText;
    }
    return resultText;
});
// 保存or更新
let richTextId = null;
const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
    // 替换图片临时地址
    for (let [key, value] of previewUrlMap) {
        valueHtml.value = valueHtml.value.replace(value, key);
    }
    // 保存or更新富文本
    if (richTextId === null) {
        let res = yield saveRichText(valueHtml.value);
        richTextId = res.data.id;
    }
    else {
        yield updateRichText(valueHtml.value);
    }
    // 将fileId:xxx转换成临时预览
    for (let [key, value] of previewUrlMap) {
        valueHtml.value = valueHtml.value.replace(key, value);
    }
    (0, element_plus_1.ElMessage)({
        message: '保存成功',
        type: 'success',
    });
});
// 关闭
const router = (0, vue_router_1.useRouter)();
const handleClose = () => __awaiter(void 0, void 0, void 0, function* () {
    yield router.push('/notice');
});
// 发送请求:保存富文本
const saveRichText = (valueHtml) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        userId: userStore.user.value.id,
        title: title.value,
        content: valueHtml
    };
    return yield (0, richTextApi_js_1.createRichTextApi)(data);
});
const updateRichText = (valueHtml) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id: richTextId,
        title: title.value,
        content: valueHtml
    };
    yield (0, richTextApi_js_1.updateRichTextApi)(data);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "notice-detail-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "title" }, { style: {} }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.title),
    placeholder: "标题",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.title),
    placeholder: "标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "editor" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_4 = {}.Toolbar;
/** @type {[typeof __VLS_components.Toolbar, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    editor: (__VLS_ctx.editorRef),
    defaultConfig: (__VLS_ctx.toolbarConfig),
    mode: (__VLS_ctx.mode),
}));
const __VLS_6 = __VLS_5({
    editor: (__VLS_ctx.editorRef),
    defaultConfig: (__VLS_ctx.toolbarConfig),
    mode: (__VLS_ctx.mode),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.Editor;
/** @type {[typeof __VLS_components.Editor, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign(Object.assign({ 'onOnCreated': {} }, { style: {} }), { modelValue: (__VLS_ctx.valueHtml), defaultConfig: (__VLS_ctx.editorConfig), mode: (__VLS_ctx.mode) })));
const __VLS_10 = __VLS_9(Object.assign(Object.assign({ 'onOnCreated': {} }, { style: {} }), { modelValue: (__VLS_ctx.valueHtml), defaultConfig: (__VLS_ctx.editorConfig), mode: (__VLS_ctx.mode) }), ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onOnCreated: (__VLS_ctx.handleCreated)
};
var __VLS_11;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "buttons" }));
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ 'onClick': {} }, { type: "primary" })));
const __VLS_18 = __VLS_17(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleSave)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign({ 'onClick': {} })));
const __VLS_26 = __VLS_25(Object.assign({ 'onClick': {} }), ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    onClick: (__VLS_ctx.handleClose)
};
__VLS_27.slots.default;
var __VLS_27;
/** @type {__VLS_StyleScopedClasses['notice-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['editor']} */ ;
/** @type {__VLS_StyleScopedClasses['buttons']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Editor: editor_for_vue_1.Editor,
            Toolbar: editor_for_vue_1.Toolbar,
            editorRef: editorRef,
            mode: mode,
            title: title,
            valueHtml: valueHtml,
            toolbarConfig: toolbarConfig,
            editorConfig: editorConfig,
            handleCreated: handleCreated,
            handleSave: handleSave,
            handleClose: handleClose,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
