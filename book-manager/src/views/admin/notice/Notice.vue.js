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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const vue_1 = require("vue");
const dayjs_1 = __importDefault(require("dayjs"));
const richTextApi_js_1 = require("@/api/richTextApi.js");
const dateScope = (0, vue_1.ref)('');
const pageDTO = (0, vue_1.reactive)({
    current: 1,
    size: 10,
    title: '',
    startTime: null,
    endTime: null,
});
const richTextPageData = (0, vue_1.reactive)([]);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield handleQueryPage();
}));
setInterval(() => {
}, 3000);
// 分页查询:公告
const handleQueryPage = () => __awaiter(void 0, void 0, void 0, function* () {
    if (dateScope.value !== '') {
        pageDTO.startTime = (0, dayjs_1.default)(dateScope.value[0]).format("YYYY-MM-DD HH:mm:ss");
        pageDTO.endTime = (0, dayjs_1.default)(dateScope.value[1]).format("YYYY-MM-DD HH:mm:ss");
    }
    const res = yield (0, richTextApi_js_1.richTextPageApi)(pageDTO);
    richTextPageData.length = 0;
    Object.assign(richTextPageData, res.data.records);
});
const router = (0, vue_router_1.useRouter)();
const handleAddNotice = () => __awaiter(void 0, void 0, void 0, function* () {
    yield router.push('/notice/add');
});
// 修改公告
const handleUpdate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield handleAddNotice();
    yield router.push({
        path: '/notice/add',
        query: { id: id }
    });
});
// 删除公告
const handleDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, richTextApi_js_1.deleteRichTextApi)(id);
    yield handleQueryPage();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-button']} */ ;
/** @type {__VLS_StyleScopedClasses['el-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "notice-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ modelValue: (__VLS_ctx.pageDTO.title), size: "small" }, { style: {} })));
const __VLS_2 = __VLS_1(Object.assign({ modelValue: (__VLS_ctx.pageDTO.title), size: "small" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_4 = {}.ElDatePicker;
/** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign(Object.assign({ class: "date-picker" }, { modelValue: (__VLS_ctx.dateScope), type: "daterange", rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间", size: "small" }), { style: {} })));
const __VLS_6 = __VLS_5(Object.assign(Object.assign({ class: "date-picker" }, { modelValue: (__VLS_ctx.dateScope), type: "daterange", rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间", size: "small" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onClick': {} }, { type: "primary", plain: true, size: "small" })));
const __VLS_10 = __VLS_9(Object.assign({ 'onClick': {} }, { type: "primary", plain: true, size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.handleQueryPage)
};
__VLS_11.slots.default;
var __VLS_11;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ 'onClick': {} }, { type: "primary", plain: true, size: "small" })));
const __VLS_18 = __VLS_17(Object.assign({ 'onClick': {} }, { type: "primary", plain: true, size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleAddNotice)
};
__VLS_19.slots.default;
var __VLS_19;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "body" }));
const __VLS_24 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign({ data: (__VLS_ctx.richTextPageData) }, { style: {} })));
const __VLS_26 = __VLS_25(Object.assign({ data: (__VLS_ctx.richTextPageData) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    prop: "title",
    label: "公告",
    align: "left",
}));
const __VLS_30 = __VLS_29({
    prop: "title",
    label: "公告",
    align: "left",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    prop: "createTime",
    label: "发布时间",
    align: "left",
    width: "200",
}));
const __VLS_34 = __VLS_33({
    prop: "createTime",
    label: "发布时间",
    align: "left",
    width: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const __VLS_36 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "操作",
    width: "200",
    align: "left",
}));
const __VLS_38 = __VLS_37({
    label: "操作",
    width: "200",
    align: "left",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_39.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_40 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(Object.assign(Object.assign({ 'onClick': {} }, { plain: true, size: "small" }), { style: {} })));
    const __VLS_42 = __VLS_41(Object.assign(Object.assign({ 'onClick': {} }, { plain: true, size: "small" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleUpdate(row.id);
        }
    };
    __VLS_43.slots.default;
    var __VLS_43;
    const __VLS_48 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(Object.assign({ 'onClick': {} }, { plain: true, size: "small" })));
    const __VLS_50 = __VLS_49(Object.assign({ 'onClick': {} }, { plain: true, size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row.id);
        }
    };
    __VLS_51.slots.default;
    var __VLS_51;
}
var __VLS_39;
var __VLS_27;
/** @type {__VLS_StyleScopedClasses['notice-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['date-picker']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            dateScope: dateScope,
            pageDTO: pageDTO,
            richTextPageData: richTextPageData,
            handleQueryPage: handleQueryPage,
            handleAddNotice: handleAddNotice,
            handleUpdate: handleUpdate,
            handleDelete: handleDelete,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
