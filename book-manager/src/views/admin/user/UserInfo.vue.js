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
const userApi_js_1 = require("@/api/userApi.js");
const icons_vue_1 = require("@element-plus/icons-vue");
const fileApi_js_1 = require("@/api/fileApi.js");
const useUserStore_js_1 = require("@/store/useUserStore.js");
const emitter_js_1 = __importDefault(require("@/config/emitter/emitter.js"));
const emits = defineEmits(['update:visible']);
const props = defineProps(['visible', 'userId']);
// 通过v-model与父组件一起控制dialog的显示
const dialogVisible = (0, vue_1.ref)(props.visible);
(0, vue_1.watch)(() => props.visible, (val) => {
    dialogVisible.value = val;
});
const handleClose = () => {
    dialogVisible.value = false;
    emits('update:visible', dialogVisible.value);
};
const user = (0, vue_1.ref)({});
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    // 获取用户信息
    const userRes = yield (0, userApi_js_1.currentUserApi)();
    user.value = userRes.data;
    // 预览用户头像
    previewImgUrl.value = yield download(user.value.avatar);
}));
setInterval(() => {
}, 3000);
(0, vue_1.watch)(() => props.userId, (val) => __awaiter(void 0, void 0, void 0, function* () {
    if (!val)
        return;
    // 获取用户信息
    const userRes = yield (0, userApi_js_1.getUserByIdApi)(val);
    user.value = userRes.data;
    // 预览用户头像
    previewImgUrl.value = yield download(user.value.avatar);
}));
const previewImgUrl = (0, vue_1.ref)('');
const handleAvatarSuccess = () => __awaiter(void 0, void 0, void 0, function* () {
    previewImgUrl.value = yield download(user.value.avatar);
});
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    return URL.createObjectURL(blob);
});
// 上传文件(头像)
const uploadFile = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadFileRes = yield (0, fileApi_js_1.uploadFileApi)(option.file);
    user.value.avatar = uploadFileRes.data;
});
const closeDialog = () => {
    dialogVisible.value = false;
};
// 修改用户信息
const updateUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    user.value.userId = user.value.id;
    yield (0, userApi_js_1.updateUserApi)(user.value);
    // 同步更新本地的用户缓存
    yield updateLocalUser();
    closeDialog();
    // 事件通知:刷新用户列表
    emitter_js_1.default.emit('refreshUserPage', null);
});
const updateLocalUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const userRes = yield (0, userApi_js_1.currentUserApi)();
    const userStore = (0, useUserStore_js_1.useUserStore)();
    userStore.user.value = userRes.data;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "user-info-container" }));
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onClose': {} }, { modelValue: (__VLS_ctx.dialogVisible), title: "个人中心", width: "20%" })));
const __VLS_2 = __VLS_1(Object.assign({ 'onClose': {} }, { modelValue: (__VLS_ctx.dialogVisible), title: "个人中心", width: "20%" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClose: (__VLS_ctx.handleClose)
};
__VLS_3.slots.default;
const __VLS_8 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign(Object.assign({ model: (__VLS_ctx.user) }, { class: "form-content" }), { labelPosition: "top" })));
const __VLS_10 = __VLS_9(Object.assign(Object.assign({ model: (__VLS_ctx.user) }, { class: "form-content" }), { labelPosition: "top" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "*头像",
}));
const __VLS_14 = __VLS_13({
    label: "*头像",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ class: "avatar-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadFile), onSuccess: (__VLS_ctx.handleAvatarSuccess) })));
const __VLS_18 = __VLS_17(Object.assign({ class: "avatar-uploader" }, { showFileList: (false), httpRequest: (__VLS_ctx.uploadFile), onSuccess: (__VLS_ctx.handleAvatarSuccess) }), ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
if (__VLS_ctx.previewImgUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)(Object.assign({ src: (__VLS_ctx.previewImgUrl) }, { class: "avatar" }));
}
else {
    const __VLS_20 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20(Object.assign({ class: "avatar-uploader-icon" })));
    const __VLS_22 = __VLS_21(Object.assign({ class: "avatar-uploader-icon" }), ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_23.slots.default;
    const __VLS_24 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_23;
}
var __VLS_19;
var __VLS_15;
const __VLS_28 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "*用户名",
}));
const __VLS_30 = __VLS_29({
    label: "*用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
const __VLS_32 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign({ modelValue: (__VLS_ctx.user.realName), size: "default" }, { style: {} })));
const __VLS_34 = __VLS_33(Object.assign({ modelValue: (__VLS_ctx.user.realName), size: "default" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_33));
var __VLS_31;
const __VLS_36 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "*用户邮箱",
}));
const __VLS_38 = __VLS_37({
    label: "*用户邮箱",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
const __VLS_40 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(Object.assign({ modelValue: (__VLS_ctx.user.email) }, { style: {} })));
const __VLS_42 = __VLS_41(Object.assign({ modelValue: (__VLS_ctx.user.email) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_41));
var __VLS_39;
var __VLS_11;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "dialog-footer" }));
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign({ 'onClick': {} }, { type: "default" })));
    const __VLS_46 = __VLS_45(Object.assign({ 'onClick': {} }, { type: "default" }), ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (__VLS_ctx.closeDialog)
    };
    __VLS_47.slots.default;
    var __VLS_47;
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52(Object.assign({ 'onClick': {} }, { type: "primary" })));
    const __VLS_54 = __VLS_53(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (__VLS_ctx.updateUserInfo)
    };
    __VLS_55.slots.default;
    var __VLS_55;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['user-info-container']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emits, Plus: icons_vue_1.Plus, dialogVisible: dialogVisible, handleClose: handleClose, user: user, previewImgUrl: previewImgUrl, handleAvatarSuccess: handleAvatarSuccess, uploadFile: uploadFile, closeDialog: closeDialog, updateUserInfo: updateUserInfo });
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional(props) }, props), { $emit: emits });
    },
});
; /* PartiallyEnd: #4569/main.vue */
