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
const bookrack_js_1 = require("@/components/js/bookrack.js");
// 页面数据
const bookracks = (0, vue_1.ref)([]);
const searchBookrack = (0, vue_1.ref)('');
// 生命周期
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    // 查询:书架配置
    yield getBookracks();
}));
// 查询:书架配置
const getBookracks = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookracksRes = yield (0, systemConfigApi_js_1.getBookrackConfigApi)();
    bookracks.value = [];
    for (let i = 0; i < bookracksRes.data.length; i++) {
        bookracks.value.push({
            id: i + 1,
            name: bookracksRes.data[i],
        });
    }
});
// 关键词搜索:书架
const handleSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getBookracks();
    bookracks.value = bookracks.value.filter(x => x.name.includes(searchBookrack.value));
});
// 正在编辑的那行id
const editId = (0, vue_1.ref)(null);
// 编辑:书架配置
const sourceBookrack = (0, vue_1.ref)('');
const handleEdit = (row) => __awaiter(void 0, void 0, void 0, function* () {
    editId.value = row.id;
    sourceBookrack.value = bookracks.value.find(x => x.id === editId.value).name;
});
// 修改、保存:书架
const handleSave = (row) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, systemConfigApi_js_1.updateBookrackConfigApi)(sourceBookrack.value, row.name);
    editId.value = null;
    yield getBookracks();
});
// 取消
const handleCancel = (row) => __awaiter(void 0, void 0, void 0, function* () {
    bookracks.value = bookracks.value.filter(x => x.id < 10000);
    editId.value = null;
});
// 删除:书架
const handleDelete = (row) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, systemConfigApi_js_1.deleteBookrackConfigApi)(row.name);
    yield getBookracks();
});
// 新增书架
const handleAdd = () => {
    // 是否已新增
    if ((0, bookrack_js_1.hasEmptyBookrack)(bookracks.value)) {
        return;
    }
    const id = new Date().getTime();
    bookracks.value.unshift({ id: id, name: '' });
    editId.value = id;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "bookrack-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ modelValue: (__VLS_ctx.searchBookrack), placeholder: "书架" }, { style: {} })));
const __VLS_2 = __VLS_1(Object.assign({ modelValue: (__VLS_ctx.searchBookrack), placeholder: "书架" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" })));
const __VLS_6 = __VLS_5(Object.assign({ 'onClick': {} }, { plain: true, type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.handleSearch)
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
    onClick: (__VLS_ctx.handleAdd)
};
__VLS_15.slots.default;
var __VLS_15;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "body" }));
const __VLS_20 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(Object.assign(Object.assign({ data: (__VLS_ctx.bookracks) }, { style: {} }), { border: true, maxHeight: "600px" })));
const __VLS_22 = __VLS_21(Object.assign(Object.assign({ data: (__VLS_ctx.bookracks) }, { style: {} }), { border: true, maxHeight: "600px" }), ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "书架",
}));
const __VLS_26 = __VLS_25({
    label: "书架",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_27.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (__VLS_ctx.editId === row.id) {
        const __VLS_28 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            modelValue: (row.name),
        }));
        const __VLS_30 = __VLS_29({
            modelValue: (row.name),
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
    if (__VLS_ctx.editId === row.id) {
        const __VLS_36 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true })));
        const __VLS_38 = __VLS_37(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_37));
        let __VLS_40;
        let __VLS_41;
        let __VLS_42;
        const __VLS_43 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.editId === row.id))
                    return;
                __VLS_ctx.handleSave(row);
            }
        };
        __VLS_39.slots.default;
        var __VLS_39;
        const __VLS_44 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true })));
        const __VLS_46 = __VLS_45(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_45));
        let __VLS_48;
        let __VLS_49;
        let __VLS_50;
        const __VLS_51 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.editId === row.id))
                    return;
                __VLS_ctx.handleCancel(row);
            }
        };
        __VLS_47.slots.default;
        var __VLS_47;
    }
    else {
        const __VLS_52 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true })));
        const __VLS_54 = __VLS_53(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_53));
        let __VLS_56;
        let __VLS_57;
        let __VLS_58;
        const __VLS_59 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.editId === row.id))
                    return;
                __VLS_ctx.handleEdit(row);
            }
        };
        __VLS_55.slots.default;
        var __VLS_55;
        const __VLS_60 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true })));
        const __VLS_62 = __VLS_61(Object.assign({ 'onClick': {} }, { size: "small", type: "primary", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_61));
        let __VLS_64;
        let __VLS_65;
        let __VLS_66;
        const __VLS_67 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.editId === row.id))
                    return;
                __VLS_ctx.handleDelete(row);
            }
        };
        __VLS_63.slots.default;
        var __VLS_63;
    }
}
var __VLS_35;
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['bookrack-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            bookracks: bookracks,
            searchBookrack: searchBookrack,
            handleSearch: handleSearch,
            editId: editId,
            handleEdit: handleEdit,
            handleSave: handleSave,
            handleCancel: handleCancel,
            handleDelete: handleDelete,
            handleAdd: handleAdd,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
