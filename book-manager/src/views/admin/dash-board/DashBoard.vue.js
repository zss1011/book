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
const TipChart_vue_1 = __importDefault(require("@/views/admin/dash-board/TipChart.vue"));
const UserChart_vue_1 = __importDefault(require("@/views/admin/dash-board/UserChart.vue"));
const vue_1 = require("vue");
const BookChart_vue_1 = __importDefault(require("@/views/admin/dash-board/BookChart.vue"));
const richTextApi_js_1 = require("@/api/richTextApi.js");
const vue_router_1 = require("vue-router");
const router = (0, vue_router_1.useRouter)();
let notice = (0, vue_1.ref)([]);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    const pageDTO = {
        current: 1,
        size: 10
    };
    const res = yield (0, richTextApi_js_1.richTextPageApi)(pageDTO);
    for (let i = 0; i < res.data.records.length; i++) {
        let data = res.data.records[i];
        notice.value.push({
            id: data.id,
            name: data.title,
            desc: data.createTime
        });
        if (i === 3) {
            break;
        }
    }
}));
// 获取公告详情
const handleNoticeDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = router.resolve({
        path: '/notice/detail',
        query: { id: id }
    });
    window.open(url.href, '_blank');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "dashBoard-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "top" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "tip-chart-wrapper" }));
/** @type {[typeof PipChart, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TipChart_vue_1.default, new TipChart_vue_1.default({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "right" }));
/** @type {[typeof UserChart, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(UserChart_vue_1.default, new UserChart_vue_1.default(Object.assign({ style: {} })));
const __VLS_4 = __VLS_3(Object.assign({ style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "middle" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "bottom" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "notice-wrapper" }));
for (const [item, idx] of __VLS_getVForSourceType((__VLS_ctx.notice))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (idx) }, { class: "notice" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.handleNoticeDetail(item.id);
        } }, { style: {} }));
    (item.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.handleNoticeDetail(item.id);
        } }, { style: {} }));
    (item.desc);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "right" }));
/** @type {[typeof BookChart, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(BookChart_vue_1.default, new BookChart_vue_1.default({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {__VLS_StyleScopedClasses['dashBoard-container']} */ ;
/** @type {__VLS_StyleScopedClasses['top']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['tip-chart-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['middle']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['notice-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['notice']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            PipChart: TipChart_vue_1.default,
            UserChart: UserChart_vue_1.default,
            BookChart: BookChart_vue_1.default,
            notice: notice,
            handleNoticeDetail: handleNoticeDetail,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
