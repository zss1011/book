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
const SubMenu_vue_1 = __importDefault(require("@/views/admin/layout/sidebar/SubMenu.vue"));
const vue_router_1 = require("vue-router");
const { menus } = defineProps(["menus"]);
const router = (0, vue_router_1.useRouter)();
const handleRoute = (menu) => {
    router.push(menu.meta.path);
};
// 设置组件name
defineOptions({
    name: 'SubMenu'
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
for (const [menu] of __VLS_getVForSourceType((menus))) {
    (menu.path);
    if (!menu.children) {
        const __VLS_0 = {}.ElMenuItem;
        /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onClick': {} }, { index: (menu.path) })));
        const __VLS_2 = __VLS_1(Object.assign({ 'onClick': {} }, { index: (menu.path) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
        let __VLS_4;
        let __VLS_5;
        let __VLS_6;
        const __VLS_7 = {
            onClick: (...[$event]) => {
                if (!(!menu.children))
                    return;
                __VLS_ctx.handleRoute(menu);
            }
        };
        __VLS_3.slots.default;
        {
            const { title: __VLS_thisSlot } = __VLS_3.slots;
            const __VLS_8 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
            const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
            __VLS_11.slots.default;
            const __VLS_12 = ((menu.meta.icon));
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
            const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
            var __VLS_11;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (menu.meta.title);
        }
        var __VLS_3;
    }
    if (menu.children && menu.children.length) {
        const __VLS_16 = {}.ElSubMenu;
        /** @type {[typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, typeof __VLS_components.ElSubMenu, typeof __VLS_components.elSubMenu, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
            index: (menu.path),
        }));
        const __VLS_18 = __VLS_17({
            index: (menu.path),
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
        __VLS_19.slots.default;
        {
            const { title: __VLS_thisSlot } = __VLS_19.slots;
            const __VLS_20 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({}));
            const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
            __VLS_23.slots.default;
            const __VLS_24 = ((menu.meta.icon));
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
            const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
            var __VLS_23;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (menu.meta.title);
        }
        /** @type {[typeof SubMenu, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(SubMenu_vue_1.default, new SubMenu_vue_1.default({
            menus: (menu.children),
        }));
        const __VLS_29 = __VLS_28({
            menus: (menu.children),
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        var __VLS_19;
    }
}
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return Object.assign(Object.assign({ $props: __VLS_makeOptional({ menus }) }, { menus }), { SubMenu: SubMenu_vue_1.default, handleRoute: handleRoute });
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return Object.assign({ $props: __VLS_makeOptional({ menus }) }, { menus });
    },
});
; /* PartiallyEnd: #4569/main.vue */
