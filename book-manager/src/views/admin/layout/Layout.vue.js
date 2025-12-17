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
const Navbar_vue_1 = __importDefault(require("@/views/admin/layout/navbar/Navbar.vue"));
const Sidebar_vue_1 = __importDefault(require("@/views/admin/layout/sidebar/Sidebar.vue"));
const MainContent_vue_1 = __importDefault(require("@/views/admin/layout/main-content/MainContent.vue"));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "layout-container" }));
/** @type {[typeof Sidebar, typeof Sidebar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Sidebar_vue_1.default, new Sidebar_vue_1.default(Object.assign({ class: "sidebar" })));
const __VLS_1 = __VLS_0(Object.assign({ class: "sidebar" }), ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "main" }));
/** @type {[typeof Navbar, typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(Navbar_vue_1.default, new Navbar_vue_1.default(Object.assign({ class: "navbar" })));
const __VLS_4 = __VLS_3(Object.assign({ class: "navbar" }), ...__VLS_functionalComponentArgsRest(__VLS_3));
/** @type {[typeof MainContent, typeof MainContent, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(MainContent_vue_1.default, new MainContent_vue_1.default(Object.assign({ class: "main-content" })));
const __VLS_7 = __VLS_6(Object.assign({ class: "main-content" }), ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['main']} */ ;
/** @type {__VLS_StyleScopedClasses['navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Navbar: Navbar_vue_1.default,
            Sidebar: Sidebar_vue_1.default,
            MainContent: MainContent_vue_1.default,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
