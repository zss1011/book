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
const vue_1 = require("vue");
const fileApi_js_1 = require("@/api/fileApi.js");
const ____svg_1 = __importDefault(require("@/svg/\u53F3\u7BAD\u5934.svg"));
const userCommentApi_js_1 = require("@/api/userCommentApi.js");
const userApi_js_1 = require("@/api/userApi.js");
const emitter_js_1 = __importDefault(require("@/config/emitter/emitter.js"));
const replyContent = (0, vue_1.ref)('');
const activeReplyId = (0, vue_1.ref)(0);
const inputRefMap = (0, vue_1.ref)({});
const data = (0, vue_1.ref)([]);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield queryPage();
}));
// 查询分页
const queryPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, userCommentApi_js_1.userCommentPageApi)(pageDTO);
    for (let datas of res.data.records) {
        for (let item of datas) {
            item.avatar = yield download(item.avatar);
            if (item.toAvatar) {
                item.toAvatar = yield download(item.toAvatar);
            }
        }
    }
    data.value = res.data.records;
    pageDTO.total = res.data.total;
});
// 分页查询用户评论
const pageDTO = (0, vue_1.reactive)({
    current: 1,
    size: 5,
    total: 100,
});
const handlePageChange = (current, size) => __awaiter(void 0, void 0, void 0, function* () {
    pageDTO.current = current;
    pageDTO.size = size;
    yield queryPage();
});
const handleReply = (id) => {
    activeReplyId.value === id ? activeReplyId.value = 0 : activeReplyId.value = id;
    (0, vue_1.nextTick)(() => {
        setTimeout(() => {
            const input = inputRefMap.value[id];
            if (input) {
                input.focus();
            }
        }, 500);
    });
};
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    return URL.createObjectURL(blob);
});
// 新增回复 addUserCommentApi
const dto = (0, vue_1.ref)({});
const handleCreate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取当前用户信息
    const res = yield (0, userApi_js_1.currentUserApi)();
    dto.value = {
        userId: res.data.id,
        anonymous: 0,
        comment: replyContent.value,
        toUserId: data.userId,
        parentId: data.id,
        businessId: data.businessId,
    };
});
const handleCancel = () => {
    activeReplyId.value = -1;
};
const handleAdd = () => __awaiter(void 0, void 0, void 0, function* () {
    dto.value.comment = replyContent.value;
    yield (0, userCommentApi_js_1.addUserCommentApi)(dto.value);
    activeReplyId.value = 0;
    yield refreshComment(dto.value.businessId);
    replyContent.value = '';
});
// 刷新评论
const refreshComment = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, userCommentApi_js_1.getUserCommentsApi)(businessId);
    for (let data of res.data) {
        data.avatar = yield download(data.avatar);
        if (data.toAvatar) {
            data.toAvatar = yield download(data.toAvatar);
        }
    }
    data.value[0] = res.data;
});
// 展开回复的businessIds
const expandIds = (0, vue_1.ref)([]);
const handleExpand = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!expandIds.value.includes(businessId))
        expandIds.value.push(businessId);
});
// 收起回复
const handleCloseReply = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    expandIds.value = expandIds.value.filter(id => id !== businessId);
});
// 监听数据刷新事件  refreshLeaveMessage
emitter_js_1.default.on('refreshLeaveMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data) {
        pageDTO.keyword = data.keyword;
        pageDTO.status = data.status;
    }
    yield queryPage();
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "leave-message-detail-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "message-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "message" }));
for (const [list, index] of __VLS_getVForSourceType((__VLS_ctx.data))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }, { key: (list[0].id) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "leave-message" }, { style: {} }));
    const __VLS_0 = {}.ElAvatar;
    /** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign({ shape: "square" }, { style: {} }), { src: (list[0].avatar) })));
    const __VLS_2 = __VLS_1(Object.assign(Object.assign({ shape: "square" }, { style: {} }), { src: (list[0].avatar) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
    (list[0].realName);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
    (list[0].comment);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "time-reply" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
    (list[0].createTime);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.handleReply(list[0].id);
            __VLS_ctx.handleCreate(list[0]);
        } }, { style: {} }));
    if (__VLS_ctx.activeReplyId === list[0].id) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "comment" }, { style: {} }));
        const __VLS_4 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign({ ref: (el => __VLS_ctx.inputRefMap[list[0].id] = el), modelValue: (__VLS_ctx.replyContent), rows: (1), type: "textarea", placeholder: ('回复 ' + list[0].realName) }, { style: {} })));
        const __VLS_6 = __VLS_5(Object.assign({ ref: (el => __VLS_ctx.inputRefMap[list[0].id] = el), modelValue: (__VLS_ctx.replyContent), rows: (1), type: "textarea", placeholder: ('回复 ' + list[0].realName) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
        const __VLS_8 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_10 = __VLS_9(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_9));
        let __VLS_12;
        let __VLS_13;
        let __VLS_14;
        const __VLS_15 = {
            onClick: (__VLS_ctx.handleCancel)
        };
        __VLS_11.slots.default;
        var __VLS_11;
        const __VLS_16 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
        const __VLS_18 = __VLS_17(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_17));
        let __VLS_20;
        let __VLS_21;
        let __VLS_22;
        const __VLS_23 = {
            onClick: (__VLS_ctx.handleAdd)
        };
        __VLS_19.slots.default;
        var __VLS_19;
    }
    if (!__VLS_ctx.expandIds.includes(list[0].businessId) && list.length - 1 >= 2) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (list.length - 1);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ onClick: (...[$event]) => {
                if (!(!__VLS_ctx.expandIds.includes(list[0].businessId) && list.length - 1 >= 2))
                    return;
                __VLS_ctx.handleExpand(list[0].businessId);
            } }, { class: "expand-action" }));
    }
    else {
        if (list.length > 1) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "reply" }, { style: {} }));
            for (const [item, index] of __VLS_getVForSourceType((list.slice(1)))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (item.id) }, { style: {} }));
                const __VLS_24 = {}.ElAvatar;
                /** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
                // @ts-ignore
                const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign(Object.assign({ shape: "square" }, { style: {} }), { src: (item.avatar) })));
                const __VLS_26 = __VLS_25(Object.assign(Object.assign({ shape: "square" }, { style: {} }), { src: (item.avatar) }), ...__VLS_functionalComponentArgsRest(__VLS_25));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
                (item.realName);
                if (item.toRealName) {
                    const __VLS_28 = {}.Arrows;
                    /** @type {[typeof __VLS_components.Arrows, ]} */ ;
                    // @ts-ignore
                    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(Object.assign({ style: {} })));
                    const __VLS_30 = __VLS_29(Object.assign({ style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_29));
                    (item.toRealName);
                }
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
                (item.comment);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "time-reply" }, { style: {} }));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
                (item.createTime);
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (...[$event]) => {
                        if (!!(!__VLS_ctx.expandIds.includes(list[0].businessId) && list.length - 1 >= 2))
                            return;
                        if (!(list.length > 1))
                            return;
                        __VLS_ctx.handleReply(item.id);
                        __VLS_ctx.handleCreate(item);
                    } }, { style: {} }));
                if (__VLS_ctx.activeReplyId === item.id) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "comment" }));
                    const __VLS_32 = {}.ElInput;
                    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                    // @ts-ignore
                    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign({ ref: (el => __VLS_ctx.inputRefMap[item.id] = el), modelValue: (__VLS_ctx.replyContent), rows: (1), type: "textarea", placeholder: ('回复 ' + item.realName) }, { style: {} })));
                    const __VLS_34 = __VLS_33(Object.assign({ ref: (el => __VLS_ctx.inputRefMap[item.id] = el), modelValue: (__VLS_ctx.replyContent), rows: (1), type: "textarea", placeholder: ('回复 ' + item.realName) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_33));
                    const __VLS_36 = {}.ElButton;
                    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
                    // @ts-ignore
                    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true })));
                    const __VLS_38 = __VLS_37(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", plain: true }), ...__VLS_functionalComponentArgsRest(__VLS_37));
                    let __VLS_40;
                    let __VLS_41;
                    let __VLS_42;
                    const __VLS_43 = {
                        onClick: (__VLS_ctx.handleAdd)
                    };
                    __VLS_39.slots.default;
                    var __VLS_39;
                }
                if (index === list.slice(1).length - 1 && list.length - 1 >= 2) {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (...[$event]) => {
                            if (!!(!__VLS_ctx.expandIds.includes(list[0].businessId) && list.length - 1 >= 2))
                                return;
                            if (!(list.length > 1))
                                return;
                            if (!(index === list.slice(1).length - 1 && list.length - 1 >= 2))
                                return;
                            __VLS_ctx.handleCloseReply(item.businessId);
                        } }, { class: "closeReply" }));
                }
            }
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "footer" }));
const __VLS_44 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign({ 'onChange': {} }, { currentPage: (__VLS_ctx.pageDTO.current), pageSize: (__VLS_ctx.pageDTO.size), layout: "prev, pager, next, jumper,total, sizes", total: (__VLS_ctx.pageDTO.total), pageSizes: ([5, 10, 20]) })));
const __VLS_46 = __VLS_45(Object.assign({ 'onChange': {} }, { currentPage: (__VLS_ctx.pageDTO.current), pageSize: (__VLS_ctx.pageDTO.size), layout: "prev, pager, next, jumper,total, sizes", total: (__VLS_ctx.pageDTO.total), pageSizes: ([5, 10, 20]) }), ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onChange: (__VLS_ctx.handlePageChange)
};
var __VLS_47;
/** @type {__VLS_StyleScopedClasses['leave-message-detail-container']} */ ;
/** @type {__VLS_StyleScopedClasses['message-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['message']} */ ;
/** @type {__VLS_StyleScopedClasses['leave-message']} */ ;
/** @type {__VLS_StyleScopedClasses['time-reply']} */ ;
/** @type {__VLS_StyleScopedClasses['comment']} */ ;
/** @type {__VLS_StyleScopedClasses['expand-action']} */ ;
/** @type {__VLS_StyleScopedClasses['reply']} */ ;
/** @type {__VLS_StyleScopedClasses['time-reply']} */ ;
/** @type {__VLS_StyleScopedClasses['comment']} */ ;
/** @type {__VLS_StyleScopedClasses['closeReply']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Arrows: ____svg_1.default,
            replyContent: replyContent,
            activeReplyId: activeReplyId,
            inputRefMap: inputRefMap,
            data: data,
            pageDTO: pageDTO,
            handlePageChange: handlePageChange,
            handleReply: handleReply,
            handleCreate: handleCreate,
            handleCancel: handleCancel,
            handleAdd: handleAdd,
            expandIds: expandIds,
            handleExpand: handleExpand,
            handleCloseReply: handleCloseReply,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
