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
const icons_vue_1 = require("@element-plus/icons-vue");
const userApi_js_1 = require("@/api/userApi.js");
const vue_1 = require("vue");
const useUserStore_js_1 = require("@/store/useUserStore.js");
const emitter_js_1 = __importDefault(require("@/config/emitter/emitter.js"));
const useNavbar_js_1 = require("@/use/useNavbar.js");
const vue_router_1 = require("vue-router");
const fileApi_js_1 = require("@/api/fileApi.js");
const UserInfo_vue_1 = __importDefault(require("@/views/admin/user/UserInfo.vue"));
const pinia_1 = require("pinia");
// 获取当前用户信息
const user = (0, vue_1.ref)({});
const avatarUrl = (0, vue_1.ref)('');
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield (0, userApi_js_1.currentUserApi)();
    user.value = data;
    // 缓存用户信息
    const userStore = (0, useUserStore_js_1.useUserStore)();
    userStore.user.value = data;
    // 用户头像
    avatarUrl.value = yield download(data.avatar);
}));
// 监听事件
let titles = (0, vue_1.ref)(['仪表盘']);
emitter_js_1.default.on('breadcrumb', (path) => {
    // 获取菜单的titles
    titles.value = (0, useNavbar_js_1.getTitles)(path);
});
// 退出登入
const router = (0, vue_router_1.useRouter)();
const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
    sessionStorage.removeItem('token');
    const userStore = (0, useUserStore_js_1.useUserStore)();
    userStore.user.value = {};
    yield router.push("/login");
});
// 用户资料
const visible = (0, vue_1.ref)(false);
const handleUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    visible.value = true;
});
(0, vue_1.watch)(visible, () => __awaiter(void 0, void 0, void 0, function* () {
    if (visible.value === true) {
        return;
    }
    const userStore = (0, useUserStore_js_1.useUserStore)();
    const { user: userCache } = (0, pinia_1.storeToRefs)(userStore);
    user.value = userCache.value.value;
    avatarUrl.value = yield download(userCache.value.value.avatar);
}));
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    const imgUrl = URL.createObjectURL(blob);
    return imgUrl;
    // 触发下载
    // triggerDownload(res)
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "navbar-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "breadcrumb" }));
const __VLS_0 = {}.ElBreadcrumb;
/** @type {[typeof __VLS_components.ElBreadcrumb, typeof __VLS_components.elBreadcrumb, typeof __VLS_components.ElBreadcrumb, typeof __VLS_components.elBreadcrumb, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    separatorIcon: (__VLS_ctx.ArrowRight),
}));
const __VLS_2 = __VLS_1({
    separatorIcon: (__VLS_ctx.ArrowRight),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [title] of __VLS_getVForSourceType((__VLS_ctx.titles))) {
    const __VLS_4 = {}.ElBreadcrumbItem;
    /** @type {[typeof __VLS_components.ElBreadcrumbItem, typeof __VLS_components.elBreadcrumbItem, typeof __VLS_components.ElBreadcrumbItem, typeof __VLS_components.elBreadcrumbItem, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({}));
    const __VLS_6 = __VLS_5({}, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (title);
    var __VLS_7;
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "right" }));
const __VLS_8 = {}.ElDropdown;
/** @type {[typeof __VLS_components.ElDropdown, typeof __VLS_components.elDropdown, typeof __VLS_components.ElDropdown, typeof __VLS_components.elDropdown, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    trigger: "click",
}));
const __VLS_10 = __VLS_9({
    trigger: "click",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "avatar" }));
const __VLS_12 = {}.ElAvatar;
/** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    shape: "circle",
    src: (__VLS_ctx.avatarUrl),
}));
const __VLS_14 = __VLS_13({
    shape: "circle",
    src: (__VLS_ctx.avatarUrl),
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
(__VLS_ctx.user.realName);
const __VLS_16 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ class: "el-icon--right" }, { style: {} })));
const __VLS_18 = __VLS_17(Object.assign({ class: "el-icon--right" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ArrowDown;
/** @type {[typeof __VLS_components.ArrowDown, typeof __VLS_components.arrowDown, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
{
    const { dropdown: __VLS_thisSlot } = __VLS_11.slots;
    const __VLS_24 = {}.ElDropdownItem;
    /** @type {[typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign({ 'onClick': {} })));
    const __VLS_26 = __VLS_25(Object.assign({ 'onClick': {} }), ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (__VLS_ctx.handleUserInfo)
    };
    __VLS_27.slots.default;
    var __VLS_27;
    const __VLS_32 = {}.ElDropdownItem;
    /** @type {[typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, typeof __VLS_components.ElDropdownItem, typeof __VLS_components.elDropdownItem, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign({ 'onClick': {} })));
    const __VLS_34 = __VLS_33(Object.assign({ 'onClick': {} }), ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.handleLogout)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
var __VLS_11;
/** @type {[typeof UserInfo, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(UserInfo_vue_1.default, new UserInfo_vue_1.default({
    visible: (__VLS_ctx.visible),
}));
const __VLS_41 = __VLS_40({
    visible: (__VLS_ctx.visible),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
/** @type {__VLS_StyleScopedClasses['navbar-container']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['breadcrumb']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['el-icon--right']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            ArrowDown: icons_vue_1.ArrowDown,
            ArrowRight: icons_vue_1.ArrowRight,
            UserInfo: UserInfo_vue_1.default,
            user: user,
            avatarUrl: avatarUrl,
            titles: titles,
            handleLogout: handleLogout,
            visible: visible,
            handleUserInfo: handleUserInfo,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
