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
const icons_vue_1 = require("@element-plus/icons-vue");
const vue_1 = require("vue");
const systemConfigApi_js_1 = require("@/api/systemConfigApi.js");
const bookApi_js_1 = require("@/api/bookApi.js");
const bookTypes = (0, vue_1.ref)([]);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield initBookTypes();
    yield handleSearch();
}));
// 初始化书籍类别
const initBookTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield (0, systemConfigApi_js_1.getBookTypeConfigApi)();
    data.unshift('全部');
    bookTypes.value = data;
});
const activeBookTypeIndex = (0, vue_1.ref)(0);
// 切换书籍类别
const handleSelectBookType = (index, bookType) => __awaiter(void 0, void 0, void 0, function* () {
    activeBookTypeIndex.value = index;
    searchBookPageDTO.bookType = bookType;
    yield handleSearch();
});
// 搜索书籍
const books = (0, vue_1.ref)([]);
const handleSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield (0, bookApi_js_1.bookPageApi)(searchBookPageDTO);
    console.log(data);
    books.value = data.records;
    console.log(books.value);
});
const searchBookPageDTO = (0, vue_1.reactive)({
    bookName: null,
    bookType: null,
    current: 1,
    size: 10,
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "borrow-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "search" }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign({ 'onKeyup': {} }, { class: "search-input" }), { placeholder: "搜索书籍", modelValue: (__VLS_ctx.searchBookPageDTO.bookName) })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign({ 'onKeyup': {} }, { class: "search-input" }), { placeholder: "搜索书籍", modelValue: (__VLS_ctx.searchBookPageDTO.bookName) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onKeyup: (...[$event]) => {
        __VLS_ctx.handleSearch();
    }
};
__VLS_3.slots.default;
{
    const { suffix: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_8 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onClick': {} }, { class: "search-icon" })));
    const __VLS_10 = __VLS_9(Object.assign({ 'onClick': {} }, { class: "search-icon" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleSearch();
        }
    };
    __VLS_11.slots.default;
    const __VLS_16 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
    const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
    var __VLS_11;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-type" }));
for (const [bookType, index] of __VLS_getVForSourceType((__VLS_ctx.bookTypes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign(Object.assign(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.handleSelectBookType(index, bookType);
        } }, { class: "book-type-item" }), { class: ({ 'book-type-item-active': __VLS_ctx.activeBookTypeIndex === index }) }), { key: (index) }));
    (bookType);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "content" }));
for (const [book, index] of __VLS_getVForSourceType((__VLS_ctx.books))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (book.id) }, { class: "book" }));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "footer" }));
/** @type {__VLS_StyleScopedClasses['borrow-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['search']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['search-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['book-type']} */ ;
/** @type {__VLS_StyleScopedClasses['book-type-item']} */ ;
/** @type {__VLS_StyleScopedClasses['book-type-item-active']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['book']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Search: icons_vue_1.Search,
            bookTypes: bookTypes,
            activeBookTypeIndex: activeBookTypeIndex,
            handleSelectBookType: handleSelectBookType,
            books: books,
            handleSearch: handleSearch,
            searchBookPageDTO: searchBookPageDTO,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
