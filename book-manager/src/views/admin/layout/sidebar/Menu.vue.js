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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_js_1 = require("@/router/router.js");
const SubMenu_vue_1 = __importDefault(require("@/views/admin/layout/sidebar/SubMenu.vue"));
const useMenu_js_1 = require("@/use/useMenu.js");
// 获取菜单路由
let menus = (0, useMenu_js_1.filterMenus)(router_js_1.routes);
console.log(menus);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "menu-container" }));
const __VLS_0 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "el-menu" }, { mode: "vertical", backgroundColor: "rgb(226, 228, 229" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "el-menu" }, { mode: "vertical", backgroundColor: "rgb(226, 228, 229" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
/** @type {[typeof SubMenu, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(SubMenu_vue_1.default, new SubMenu_vue_1.default({
    menus: (__VLS_ctx.menus),
}));
const __VLS_5 = __VLS_4({
    menus: (__VLS_ctx.menus),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['menu-container']} */ ;
/** @type {__VLS_StyleScopedClasses['el-menu']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            SubMenu: SubMenu_vue_1.default,
            menus: menus,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
