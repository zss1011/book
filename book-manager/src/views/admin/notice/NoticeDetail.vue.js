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
const vue_router_1 = require("vue-router");
const vue_1 = require("vue");
const richTextApi_js_1 = require("@/api/richTextApi.js");
const fileApi_js_1 = require("@/api/fileApi.js");
const route = (0, vue_router_1.useRoute)();
// 公告内容
let title = (0, vue_1.ref)('');
let content = (0, vue_1.ref)('');
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(resolve => setTimeout(resolve, 300));
    let id = route.query.id;
    // 获取公告详情
    const res = yield (0, richTextApi_js_1.richTextDetailApi)(id);
    title.value = res.data.title;
    // 处理图片预览
    content.value = yield replaceFileId(res.data.content);
    console.log();
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
        resultText = text.replace(fileId, res);
        text = resultText;
    }
    return resultText;
});
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    return URL.createObjectURL(blob);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "notice-detail-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "notice-detail-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "title" }, { style: {} }));
(__VLS_ctx.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "content" }));
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.content) }), null, null);
/** @type {__VLS_StyleScopedClasses['notice-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-detail-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            title: title,
            content: content,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
