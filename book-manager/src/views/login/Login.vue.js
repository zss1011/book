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
const icons_vue_1 = require("@element-plus/icons-vue");
const vue_router_1 = require("vue-router");
const userApi_js_1 = require("@/api/userApi.js");
const element_plus_1 = require("element-plus");
// 登入账户
let login = (0, vue_1.ref)({
    username: "zs",
    password: "123",
});
// 跳转注册页
const router = (0, vue_router_1.useRouter)();
const goRegister = () => {
    router.push('/register');
};
// 用户登入
const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, userApi_js_1.userLoginApi)(login.value);
    let token = res.data;
    if (res.code !== 200) {
        return;
    }
    (0, element_plus_1.ElMessage)({
        message: '登入成功',
        type: 'success',
    });
    // 存储token
    sessionStorage.setItem('token', token);
    // 获取当前用户信息
    const { data } = yield (0, userApi_js_1.currentUserApi)();
    const roles = Array.isArray(data.roles) ? data.roles : [];
    for (let role of roles) {
        if (role.roleName === '管理员') {
            yield router.push('/');
            return;
        }
    }
    yield router.push('/user/background');
});
// 处理用户登入
const onEnterLogin = () => __awaiter(void 0, void 0, void 0, function* () {
    yield handleLogin();
});
const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "login-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "login" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "login-form" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ model: (__VLS_ctx.login), rules: (__VLS_ctx.rules) }, { class: "form-content" })));
const __VLS_2 = __VLS_1(Object.assign({ model: (__VLS_ctx.login), rules: (__VLS_ctx.rules) }, { class: "form-content" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign({ prop: "username" }, { style: {} })));
const __VLS_6 = __VLS_5(Object.assign({ prop: "username" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ modelValue: (__VLS_ctx.login.username), prefixIcon: (__VLS_ctx.Avatar), placeholder: "请输入账户" }, { style: {} })));
const __VLS_10 = __VLS_9(Object.assign({ modelValue: (__VLS_ctx.login.username), prefixIcon: (__VLS_ctx.Avatar), placeholder: "请输入账户" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_9));
var __VLS_7;
const __VLS_12 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign({ prop: "password" }, { style: {} })));
const __VLS_14 = __VLS_13(Object.assign({ prop: "password" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign(Object.assign({ 'onKeyup': {} }, { modelValue: (__VLS_ctx.login.password), prefixIcon: (__VLS_ctx.Lock), type: "password", showPassword: true, placeholder: "请输入密码" }), { style: {} })));
const __VLS_18 = __VLS_17(Object.assign(Object.assign({ 'onKeyup': {} }, { modelValue: (__VLS_ctx.login.password), prefixIcon: (__VLS_ctx.Lock), type: "password", showPassword: true, placeholder: "请输入密码" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onKeyup: (__VLS_ctx.onEnterLogin)
};
var __VLS_19;
var __VLS_15;
const __VLS_24 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(Object.assign(Object.assign({ 'onClick': {} }, { type: "primary" }), { style: {} })));
const __VLS_30 = __VLS_29(Object.assign(Object.assign({ 'onClick': {} }, { type: "primary" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.handleLogin)
};
__VLS_31.slots.default;
var __VLS_31;
var __VLS_27;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ onClick: (__VLS_ctx.goRegister) }, { style: {} }));
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['login']} */ ;
/** @type {__VLS_StyleScopedClasses['login-form']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Avatar: icons_vue_1.Avatar,
            Lock: icons_vue_1.Lock,
            login: login,
            goRegister: goRegister,
            handleLogin: handleLogin,
            onEnterLogin: onEnterLogin,
            rules: rules,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
