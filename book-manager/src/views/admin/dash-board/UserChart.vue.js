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
Object.defineProperty(exports, "__esModule", { value: true });
const echarts = __importStar(require("echarts"));
const vue_1 = require("vue");
// select逻辑
const dateRange = (0, vue_1.ref)('7天内');
const onChange = (val) => {
    console.log(val);
};
(0, vue_1.onMounted)(() => {
    let chartDom = document.getElementById('category-chart-container');
    let myChart = echarts.init(chartDom);
    let option;
    option = {
        xAxis: {
            type: 'category',
            data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
        },
        yAxis: {
            type: 'value'
        },
        title: {
            text: '用户数',
            left: '30px',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ]
    };
    option && myChart.setOption(option);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "category-chart-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)(Object.assign(Object.assign({ class: "category-chart-container" }, { id: "category-chart-container" }), { style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "select" }));
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.dateRange), size: "default" })));
const __VLS_2 = __VLS_1(Object.assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.dateRange), size: "default" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onChange: (__VLS_ctx.onChange)
};
__VLS_3.slots.default;
const __VLS_8 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "7天内",
    value: "7",
}));
const __VLS_10 = __VLS_9({
    label: "7天内",
    value: "7",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "30天内",
    value: "30",
}));
const __VLS_14 = __VLS_13({
    label: "30天内",
    value: "30",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.ElOption;
/** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "60天内",
    value: "60",
}));
const __VLS_18 = __VLS_17({
    label: "60天内",
    value: "60",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['category-chart-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['category-chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['select']} */ ;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            dateRange: dateRange,
            onChange: onChange,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
