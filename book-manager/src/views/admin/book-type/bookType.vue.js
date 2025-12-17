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
const vue_1 = require("vue");
const systemConfigApi_js_1 = require("@/api/systemConfigApi.js");
const bookType_js_1 = require("@/components/js/bookType.js");
// 页面数据:书籍类别
const bookTypes = (0, vue_1.ref)([]);
// 正在编辑的那一行
const editNameId = (0, vue_1.ref)(null);
// 生命周期
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    // 查询书籍类别
    yield getBookTypes();
}));
// 查询书籍类别
const sourceBookTypes = (0, vue_1.ref)([]);
const getBookTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookTypesRes = yield (0, systemConfigApi_js_1.getBookTypeConfigApi)();
    let id = 1;
    for (let bookType of bookTypesRes.data) {
        bookTypes.value.push({
            id: id,
            name: bookType
        });
        id += 1;
    }
    sourceBookTypes.value = JSON.parse(JSON.stringify(bookTypes.value));
});
// 开始编辑
const startEdit = (row) => {
    editNameId.value = row.id;
};
// 取消编辑
const cancelEdit = () => {
    editNameId.value = null;
    bookTypes.value = bookTypes.value.filter(x => {
        return x.id < 10000;
    });
};
// 新增书籍类别
const handleAddBookType = () => {
    // 判断是否已新增过
    if ((0, bookType_js_1.hasEmptyBookType)(bookTypes.value)) {
        return;
    }
    const id = new Date().getTime();
    bookTypes.value.unshift({ id: id, name: '' });
    editNameId.value = id;
};
// 保存书籍类别
const saveBookType = (row) => __awaiter(void 0, void 0, void 0, function* () {
    if (row.name === '') {
        bookTypes.value = bookTypes.value.filter(x => x.id < 10000);
        return;
    }
    if (row.id >= 100000) {
        // 新增
        yield (0, systemConfigApi_js_1.addBookTypeConfigApi)(row.name);
        bookTypes.value = [];
        yield getBookTypes();
        editNameId.value = null;
        return;
    }
    const sourceBookType = sourceBookTypes.value.find(x => x.id === row.id);
    yield (0, systemConfigApi_js_1.updateBookTypeConfigApi)(sourceBookType.name, row.name);
    bookTypes.value = [];
    yield getBookTypes();
    editNameId.value = null;
});
// 删除:书籍类别
const deleteBookType = (row) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, systemConfigApi_js_1.deleteBookTypeConfigApi)(row.name);
    bookTypes.value = [];
    yield getBookTypes();
});
// 搜索:书籍类别
const bookTypeSearch = (0, vue_1.ref)('');
const handleBookTypeSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    if (bookTypeSearch.value === '') {
        bookTypes.value = [];
        yield getBookTypes();
    }
    bookTypes.value = bookTypes.value.filter(x => {
        return x.name.includes(bookTypeSearch.value);
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-type-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ placeholder: "书籍类别名", modelValue: (__VLS_ctx.bookTypeSearch) }, { style: {} })));
const __VLS_2 = __VLS_1(Object.assign({ placeholder: "书籍类别名", modelValue: (__VLS_ctx.bookTypeSearch) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" })));
const __VLS_6 = __VLS_5(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.handleBookTypeSearch)
};
__VLS_7.slots.default;
var __VLS_7;
const __VLS_12 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" })));
const __VLS_14 = __VLS_13(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.handleAddBookType)
};
__VLS_15.slots.default;
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "body" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-type-wrapper" }, { style: {} }));
const __VLS_20 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(Object.assign(Object.assign({ data: (__VLS_ctx.bookTypes) }, { style: {} }), { border: true, maxHeight: "600px" })));
const __VLS_22 = __VLS_21(Object.assign(Object.assign({ data: (__VLS_ctx.bookTypes) }, { style: {} }), { border: true, maxHeight: "600px" }), ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "书籍类别名",
}));
const __VLS_26 = __VLS_25({
    label: "书籍类别名",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_27.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (__VLS_ctx.editNameId === row.id) {
        const __VLS_28 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            modelValue: (row.name),
            size: "default",
        }));
        const __VLS_30 = __VLS_29({
            modelValue: (row.name),
            size: "default",
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    }
    else {
        (row.name);
    }
}
var __VLS_27;
const __VLS_32 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    label: "操作",
}));
const __VLS_34 = __VLS_33({
    label: "操作",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_35.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (__VLS_ctx.editNameId === row.id) {
        const __VLS_36 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_38 = __VLS_37(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_37));
        let __VLS_40;
        let __VLS_41;
        let __VLS_42;
        const __VLS_43 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.editNameId === row.id))
                    return;
                __VLS_ctx.saveBookType(row);
            }
        };
        __VLS_39.slots.default;
        var __VLS_39;
        const __VLS_44 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_46 = __VLS_45(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_45));
        let __VLS_48;
        let __VLS_49;
        let __VLS_50;
        const __VLS_51 = {
            onClick: (__VLS_ctx.cancelEdit)
        };
        __VLS_47.slots.default;
        var __VLS_47;
    }
    else {
        const __VLS_52 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_54 = __VLS_53(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_53));
        let __VLS_56;
        let __VLS_57;
        let __VLS_58;
        const __VLS_59 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.editNameId === row.id))
                    return;
                __VLS_ctx.startEdit(row);
            }
        };
        __VLS_55.slots.default;
        var __VLS_55;
        const __VLS_60 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_62 = __VLS_61(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_61));
        let __VLS_64;
        let __VLS_65;
        let __VLS_66;
        const __VLS_67 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.editNameId === row.id))
                    return;
                __VLS_ctx.deleteBookType(row);
            }
        };
        __VLS_63.slots.default;
        var __VLS_63;
    }
}
var __VLS_35;
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['book-type-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
/** @type {__VLS_StyleScopedClasses['book-type-wrapper']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            bookTypes: bookTypes,
            editNameId: editNameId,
            startEdit: startEdit,
            cancelEdit: cancelEdit,
            handleAddBookType: handleAddBookType,
            saveBookType: saveBookType,
            deleteBookType: deleteBookType,
            bookTypeSearch: bookTypeSearch,
            handleBookTypeSearch: handleBookTypeSearch,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
