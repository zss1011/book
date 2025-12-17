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
const ____svg_1 = __importDefault(require("@/svg/\u611F\u53F9\u53F7.svg"));
const choose_svg_1 = __importDefault(require("@/svg/choose.svg"));
const error_svg_1 = __importDefault(require("@/svg/error.svg"));
const bookApi_js_1 = require("@/api/bookApi.js");
const fileApi_js_1 = require("@/api/fileApi.js");
const icons_vue_1 = require("@element-plus/icons-vue");
const systemConfigApi_js_1 = require("@/api/systemConfigApi.js");
const dayjs_1 = __importDefault(require("dayjs"));
const element_plus_1 = require("element-plus");
// 页面数据：新增数据
const book = (0, vue_1.ref)({
    status: null, // 书籍状态:1预售 2上架
    cover: null, // 书籍封面
    bookrack: null, // 书架
    type: null, // 书籍类别
    addedDate: null, // 上架时间
    number: 1, // 书籍数量
    name: null, // 书籍名称
    publishers: null, // 出版商
    author: null, // 作者
    bookNo: null, // 书号
    bookInfo: null, // 书籍简介
});
const ruleFormRef = (0, vue_1.ref)();
const rules = {
    bookrack: [{ required: true, message: '书架不能为空', trigger: 'change' }],
    type: [{ required: true, message: '书籍类别不能为空', trigger: 'change' }],
    name: [{ required: true, message: '书籍名不能为空', trigger: 'blur' }],
    cover: [{ required: true, message: '封面不能为空', trigger: 'change' }],
    publishers: [{ required: true, message: '出版商不能为空', trigger: 'blur' }],
    author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
    bookNo: [{ required: true, message: '书号不能为空', trigger: 'blur' }],
    bookInfo: [{ required: true, message: '书籍简介不能为空', trigger: 'blur' }],
};
// 预售状态
const bookStatus = (0, vue_1.ref)(true);
(0, vue_1.watch)(bookStatus, (val) => {
    book.value.status = val ? 1 : 2;
}, { immediate: true });
// 书架配置
const bookrackConfigOptions = (0, vue_1.ref)([]);
// 书籍类别
const bookTypeConfigs = (0, vue_1.ref)([]);
// 上传图片
const uploadFile = (option) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, fileApi_js_1.uploadFileApi)(option.file);
    book.value.cover = res.data;
});
const previewImgUrl = (0, vue_1.ref)(''); // 图片预览url
const handleAvatarSuccess = (response, uploadFile) => __awaiter(void 0, void 0, void 0, function* () {
    previewImgUrl.value = yield download(book.value.cover);
});
// 页面数据：分页数据
const total = (0, vue_1.ref)(0);
const pageDTO = (0, vue_1.ref)({
    current: 1,
    size: 12,
    bookName: null,
    bookrack: null,
});
// 书籍
const books = (0, vue_1.ref)([]);
(0, vue_1.onMounted)(() => __awaiter(void 0, void 0, void 0, function* () {
    // 分页查询书籍
    yield queryBookPage();
    // 查询:书架配置
    yield getBookrackConfigOptions();
    // 查询:书籍类别
    yield getBookTypeConfig();
}));
// 查询:书籍类别
const getBookTypeConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookTypeConfigRes = yield (0, systemConfigApi_js_1.getBookTypeConfigApi)();
    for (let config of bookTypeConfigRes.data) {
        bookTypeConfigs.value.push({ label: config, value: config });
    }
});
// 查询:书架配置
const getBookrackConfigOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookrackConfigRes = yield (0, systemConfigApi_js_1.getBookrackConfigApi)();
    for (let config of bookrackConfigRes.data) {
        bookrackConfigOptions.value.push({ label: config, value: config });
    }
});
// 查询数据
const handleBookSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    yield queryBookPage();
});
const onEnterBookSearch = () => __awaiter(void 0, void 0, void 0, function* () {
    yield handleBookSearch();
});
// 分页查询
const handlePageChange = (current, size) => __awaiter(void 0, void 0, void 0, function* () {
    pageDTO.value.current = current;
    pageDTO.value.size = size;
    yield queryBookPage();
});
// pagination分页查询
const queryBookPage = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookPageRes = yield (0, bookApi_js_1.bookPageApi)(pageDTO.value);
    books.value = bookPageRes.data.records;
    total.value = bookPageRes.data.total;
    for (let bookItem of books.value) {
        bookItem.previewUrl = yield download(bookItem.cover);
    }
});
// 文件下载
const download = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    // 获取文件流
    const res = yield (0, fileApi_js_1.downloadFileApi)(fileId);
    const blob = res.data;
    return URL.createObjectURL(blob);
});
// 对话框
const dialogVisible = (0, vue_1.ref)(false);
const handleDialog = () => {
    dialogVisible.value = !dialogVisible.value;
    isAddMode.value = true;
    book.value = {};
    previewImgUrl.value = '';
    console.log(book.value);
};
const handleCloseDialog = () => {
    dialogVisible.value = false;
};
// 确定修改:书籍
const handleConfirmUpdateBook = () => __awaiter(void 0, void 0, void 0, function* () {
    if (book.value.addedDate) {
        book.value.addedDate = (0, dayjs_1.default)(book.value.addedDate).format("YYYY-MM-DD HH:mm:ss");
    }
    yield (0, bookApi_js_1.updateBookApi)(book.value);
    dialogVisible.value = false;
    yield queryBookPage();
});
// 新增书籍
const handleAddBook = (formEl) => __awaiter(void 0, void 0, void 0, function* () {
    if (book.value.addedDate) {
        book.value.addedDate = (0, dayjs_1.default)(book.value.addedDate).format("YYYY-MM-DD HH:mm:ss");
    }
    // 表单校验
    try {
        yield formEl.validate(); // 如果校验失败，这里会 throw
    }
    catch (err) {
        console.log('表单校验不通过:', err);
        return;
    }
    yield (0, bookApi_js_1.addBookApi)(book.value);
    clearBook();
    dialogVisible.value = false;
});
const clearBook = () => {
    book.value = {
        status: null,
        cover: null,
        bookrack: null,
        type: null,
        addedDate: null,
        number: 1,
        name: null,
        publishers: null,
        author: null,
        bookNo: null,
        bookInfo: null,
    };
    bookStatus.value = true;
    previewImgUrl.value = null;
};
// 删除书籍
const handleDeleteBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield element_plus_1.ElMessageBox.confirm('是否要删除?', '警告', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
        });
        yield (0, bookApi_js_1.deleteBookApi)(bookId);
        yield queryBookPage();
        element_plus_1.ElMessage.success('删除成功');
    }
    catch (_a) {
        element_plus_1.ElMessage.info('取消成功');
    }
});
// 修改书籍
const isAddMode = (0, vue_1.ref)(true);
const handleUpdateBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    dialogVisible.value = true;
    isAddMode.value = false;
    // 查询:书籍详情
    const bookDetailRes = yield (0, bookApi_js_1.bookDetailApi)(bookId);
    book.value = bookDetailRes.data;
    previewImgUrl.value = yield download(book.value.cover);
    bookStatus.value = book.value.status === 1;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input__wrapper']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign({ 'onKeyup': {} }, { modelValue: (__VLS_ctx.pageDTO.bookName), placeholder: "书名" }), { style: {} })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign({ 'onKeyup': {} }, { modelValue: (__VLS_ctx.pageDTO.bookName), placeholder: "书名" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onKeyup: (__VLS_ctx.onEnterBookSearch)
};
__VLS_3.slots.default;
{
    const { append: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_8 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onClick': {} }, { icon: (__VLS_ctx.Search) })));
    const __VLS_10 = __VLS_9(Object.assign({ 'onClick': {} }, { icon: (__VLS_ctx.Search) }), ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (__VLS_ctx.handleBookSearch)
    };
    var __VLS_11;
}
var __VLS_3;
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign(Object.assign({ 'onClick': {} }, { type: "success" }), { style: {} })));
const __VLS_18 = __VLS_17(Object.assign(Object.assign({ 'onClick': {} }, { type: "success" }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.handleDialog)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(Object.assign({ modelValue: (__VLS_ctx.dialogVisible) }, { style: {} })));
const __VLS_26 = __VLS_25(Object.assign({ modelValue: (__VLS_ctx.dialogVisible) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "add-book-dialog" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "content" }));
const __VLS_28 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28(Object.assign({ model: (__VLS_ctx.book), rules: (__VLS_ctx.rules), ref: "ruleFormRef" }, { class: "form-content" })));
const __VLS_30 = __VLS_29(Object.assign({ model: (__VLS_ctx.book), rules: (__VLS_ctx.rules), ref: "ruleFormRef" }, { class: "form-content" }), ...__VLS_functionalComponentArgsRest(__VLS_29));
/** @type {typeof __VLS_ctx.ruleFormRef} */ ;
var __VLS_32 = {};
__VLS_31.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "left" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_34 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    prop: "cover",
}));
const __VLS_36 = __VLS_35({
    prop: "cover",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
const __VLS_38 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38(Object.assign({ class: "avatar-uploader" }, { httpRequest: (__VLS_ctx.uploadFile), showFileList: (false), onSuccess: (__VLS_ctx.handleAvatarSuccess) })));
const __VLS_40 = __VLS_39(Object.assign({ class: "avatar-uploader" }, { httpRequest: (__VLS_ctx.uploadFile), showFileList: (false), onSuccess: (__VLS_ctx.handleAvatarSuccess) }), ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
if (__VLS_ctx.previewImgUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: (__VLS_ctx.previewImgUrl) }, { class: "avatar" }));
}
else {
    const __VLS_42 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42(Object.assign({ class: "avatar-uploader-icon" })));
    const __VLS_44 = __VLS_43(Object.assign({ class: "avatar-uploader-icon" }), ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_45.slots.default;
    const __VLS_46 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({}));
    const __VLS_48 = __VLS_47({}, ...__VLS_functionalComponentArgsRest(__VLS_47));
    var __VLS_45;
}
var __VLS_41;
var __VLS_37;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_50 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    prop: "bookrack",
}));
const __VLS_52 = __VLS_51({
    prop: "bookrack",
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_53.slots.default;
const __VLS_54 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54(Object.assign({ modelValue: (__VLS_ctx.book.bookrack), placeholder: "请选择", clearable: true }, { style: {} })));
const __VLS_56 = __VLS_55(Object.assign({ modelValue: (__VLS_ctx.book.bookrack), placeholder: "请选择", clearable: true }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_55));
__VLS_57.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.bookrackConfigOptions))) {
    const __VLS_58 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_60 = __VLS_59({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
}
var __VLS_57;
var __VLS_53;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_62 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
    prop: "type",
}));
const __VLS_64 = __VLS_63({
    prop: "type",
}, ...__VLS_functionalComponentArgsRest(__VLS_63));
__VLS_65.slots.default;
const __VLS_66 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66(Object.assign({ modelValue: (__VLS_ctx.book.type), placeholder: "请选择" }, { style: {} })));
const __VLS_68 = __VLS_67(Object.assign({ modelValue: (__VLS_ctx.book.type), placeholder: "请选择" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_67));
__VLS_69.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.bookTypeConfigs))) {
    const __VLS_70 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }));
    const __VLS_72 = __VLS_71({
        key: (item.value),
        label: (item.label),
        value: (item.value),
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
}
var __VLS_69;
var __VLS_65;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_74 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
__VLS_77.slots.default;
const __VLS_78 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78(Object.assign({ modelValue: (__VLS_ctx.bookStatus) }, { style: {} })));
const __VLS_80 = __VLS_79(Object.assign({ modelValue: (__VLS_ctx.bookStatus) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_79));
var __VLS_77;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_82 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    prop: "addedDate",
}));
const __VLS_84 = __VLS_83({
    prop: "addedDate",
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
__VLS_85.slots.default;
const __VLS_86 = {}.ElDatePicker;
/** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
    type: "date",
    placeholder: "计划上架时间",
    modelValue: (__VLS_ctx.book.addedDate),
    disabled: (!__VLS_ctx.bookStatus),
}));
const __VLS_88 = __VLS_87({
    type: "date",
    placeholder: "计划上架时间",
    modelValue: (__VLS_ctx.book.addedDate),
    disabled: (!__VLS_ctx.bookStatus),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
var __VLS_85;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_90 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({}));
const __VLS_92 = __VLS_91({}, ...__VLS_functionalComponentArgsRest(__VLS_91));
__VLS_93.slots.default;
const __VLS_94 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
    modelValue: (__VLS_ctx.book.number),
    min: (1),
    max: (10),
}));
const __VLS_96 = __VLS_95({
    modelValue: (__VLS_ctx.book.number),
    min: (1),
    max: (10),
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
var __VLS_93;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "right" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_98 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98(Object.assign({ prop: "name" }, { style: {} })));
const __VLS_100 = __VLS_99(Object.assign({ prop: "name" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_99));
__VLS_101.slots.default;
const __VLS_102 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102(Object.assign({ modelValue: (__VLS_ctx.book.name), placeholder: "输入" }, { style: {} })));
const __VLS_104 = __VLS_103(Object.assign({ modelValue: (__VLS_ctx.book.name), placeholder: "输入" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_103));
var __VLS_101;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_106 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
    prop: "publishers",
}));
const __VLS_108 = __VLS_107({
    prop: "publishers",
}, ...__VLS_functionalComponentArgsRest(__VLS_107));
__VLS_109.slots.default;
const __VLS_110 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110(Object.assign({ modelValue: (__VLS_ctx.book.publishers), placeholder: "输入" }, { style: {} })));
const __VLS_112 = __VLS_111(Object.assign({ modelValue: (__VLS_ctx.book.publishers), placeholder: "输入" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_111));
var __VLS_109;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_114 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
    prop: "author",
}));
const __VLS_116 = __VLS_115({
    prop: "author",
}, ...__VLS_functionalComponentArgsRest(__VLS_115));
__VLS_117.slots.default;
const __VLS_118 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118(Object.assign({ modelValue: (__VLS_ctx.book.author), placeholder: "输入" }, { style: {} })));
const __VLS_120 = __VLS_119(Object.assign({ modelValue: (__VLS_ctx.book.author), placeholder: "输入" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_119));
var __VLS_117;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_122 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    prop: "bookNo",
}));
const __VLS_124 = __VLS_123({
    prop: "bookNo",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
__VLS_125.slots.default;
const __VLS_126 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126(Object.assign({ modelValue: (__VLS_ctx.book.bookNo), placeholder: "输入" }, { style: {} })));
const __VLS_128 = __VLS_127(Object.assign({ modelValue: (__VLS_ctx.book.bookNo), placeholder: "输入" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_127));
var __VLS_125;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ style: {} }));
const __VLS_130 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
    prop: "bookInfo",
}));
const __VLS_132 = __VLS_131({
    prop: "bookInfo",
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
__VLS_133.slots.default;
const __VLS_134 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134(Object.assign({ modelValue: (__VLS_ctx.book.bookInfo), type: "textarea", placeholder: "书籍简介" }, { style: {} })));
const __VLS_136 = __VLS_135(Object.assign({ modelValue: (__VLS_ctx.book.bookInfo), type: "textarea", placeholder: "书籍简介" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_135));
var __VLS_133;
var __VLS_31;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "footer" }));
if (__VLS_ctx.isAddMode) {
    const __VLS_138 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138(Object.assign({ 'onClick': {} }, { type: "info" })));
    const __VLS_140 = __VLS_139(Object.assign({ 'onClick': {} }, { type: "info" }), ...__VLS_functionalComponentArgsRest(__VLS_139));
    let __VLS_142;
    let __VLS_143;
    let __VLS_144;
    const __VLS_145 = {
        onClick: (__VLS_ctx.handleCloseDialog)
    };
    __VLS_141.slots.default;
    var __VLS_141;
    const __VLS_146 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146(Object.assign({ 'onClick': {} }, { type: "success" })));
    const __VLS_148 = __VLS_147(Object.assign({ 'onClick': {} }, { type: "success" }), ...__VLS_functionalComponentArgsRest(__VLS_147));
    let __VLS_150;
    let __VLS_151;
    let __VLS_152;
    const __VLS_153 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.isAddMode))
                return;
            __VLS_ctx.handleAddBook(__VLS_ctx.ruleFormRef);
        }
    };
    __VLS_149.slots.default;
    var __VLS_149;
}
else {
    const __VLS_154 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154(Object.assign({ 'onClick': {} }, { type: "info" })));
    const __VLS_156 = __VLS_155(Object.assign({ 'onClick': {} }, { type: "info" }), ...__VLS_functionalComponentArgsRest(__VLS_155));
    let __VLS_158;
    let __VLS_159;
    let __VLS_160;
    const __VLS_161 = {
        onClick: (__VLS_ctx.handleCloseDialog)
    };
    __VLS_157.slots.default;
    var __VLS_157;
    const __VLS_162 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162(Object.assign({ 'onClick': {} }, { type: "success" })));
    const __VLS_164 = __VLS_163(Object.assign({ 'onClick': {} }, { type: "success" }), ...__VLS_functionalComponentArgsRest(__VLS_163));
    let __VLS_166;
    let __VLS_167;
    let __VLS_168;
    const __VLS_169 = {
        onClick: (__VLS_ctx.handleConfirmUpdateBook)
    };
    __VLS_165.slots.default;
    var __VLS_165;
}
var __VLS_27;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "body" }));
for (const [book] of __VLS_getVForSourceType((__VLS_ctx.books))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-item" }, { key: (book.id) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-cover" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img, __VLS_intrinsicElements.img)(Object.assign({ src: (book.previewUrl) }, { style: {} }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-name" }, { title: (book.name) }));
    (book.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "book-category" }));
    if (book.status === 1) {
        const __VLS_170 = {}.Symbol;
        /** @type {[typeof __VLS_components.Symbol, ]} */ ;
        // @ts-ignore
        const __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170(Object.assign({ class: "symbol" })));
        const __VLS_172 = __VLS_171(Object.assign({ class: "symbol" }), ...__VLS_functionalComponentArgsRest(__VLS_171));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    if (book.status === 2) {
        const __VLS_174 = {}.Choose;
        /** @type {[typeof __VLS_components.Choose, ]} */ ;
        // @ts-ignore
        const __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174(Object.assign({ class: "choose" })));
        const __VLS_176 = __VLS_175(Object.assign({ class: "choose" }), ...__VLS_functionalComponentArgsRest(__VLS_175));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    if (book.status === 3) {
        const __VLS_178 = {}.Error;
        /** @type {[typeof __VLS_components.Error, ]} */ ;
        // @ts-ignore
        const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178(Object.assign({ class: "error" })));
        const __VLS_180 = __VLS_179(Object.assign({ class: "error" }), ...__VLS_functionalComponentArgsRest(__VLS_179));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "publisher" }));
    (book.publishers);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "author" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ style: {} }));
    (book.author);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (book.number);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "button" }));
    const __VLS_182 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182(Object.assign({ 'onClick': {} }, { type: "info", size: "small" })));
    const __VLS_184 = __VLS_183(Object.assign({ 'onClick': {} }, { type: "info", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_183));
    let __VLS_186;
    let __VLS_187;
    let __VLS_188;
    const __VLS_189 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleUpdateBook(book.id);
        }
    };
    __VLS_185.slots.default;
    var __VLS_185;
    const __VLS_190 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190(Object.assign({ 'onClick': {} }, { type: "info", size: "small" })));
    const __VLS_192 = __VLS_191(Object.assign({ 'onClick': {} }, { type: "info", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_191));
    let __VLS_194;
    let __VLS_195;
    let __VLS_196;
    const __VLS_197 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDeleteBook(book.id);
        }
    };
    __VLS_193.slots.default;
    var __VLS_193;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "footer" }));
const __VLS_198 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198(Object.assign({ 'onChange': {} }, { layout: " prev, pager, next, total", total: (__VLS_ctx.total), currentPage: (__VLS_ctx.pageDTO.current), pageSize: (__VLS_ctx.pageDTO.size) })));
const __VLS_200 = __VLS_199(Object.assign({ 'onChange': {} }, { layout: " prev, pager, next, total", total: (__VLS_ctx.total), currentPage: (__VLS_ctx.pageDTO.current), pageSize: (__VLS_ctx.pageDTO.size) }), ...__VLS_functionalComponentArgsRest(__VLS_199));
let __VLS_202;
let __VLS_203;
let __VLS_204;
const __VLS_205 = {
    onChange: (__VLS_ctx.handlePageChange)
};
var __VLS_201;
/** @type {__VLS_StyleScopedClasses['book-container']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['add-book-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['content']} */ ;
/** @type {__VLS_StyleScopedClasses['form-content']} */ ;
/** @type {__VLS_StyleScopedClasses['left']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-uploader-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['right']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
/** @type {__VLS_StyleScopedClasses['book-item']} */ ;
/** @type {__VLS_StyleScopedClasses['book-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['book-name']} */ ;
/** @type {__VLS_StyleScopedClasses['book-category']} */ ;
/** @type {__VLS_StyleScopedClasses['symbol']} */ ;
/** @type {__VLS_StyleScopedClasses['choose']} */ ;
/** @type {__VLS_StyleScopedClasses['error']} */ ;
/** @type {__VLS_StyleScopedClasses['publisher']} */ ;
/** @type {__VLS_StyleScopedClasses['author']} */ ;
/** @type {__VLS_StyleScopedClasses['button']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
// @ts-ignore
var __VLS_33 = __VLS_32;
var __VLS_dollars;
const __VLS_self = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {
            Symbol: ____svg_1.default,
            Choose: choose_svg_1.default,
            Error: error_svg_1.default,
            Plus: icons_vue_1.Plus,
            Search: icons_vue_1.Search,
            book: book,
            ruleFormRef: ruleFormRef,
            rules: rules,
            bookStatus: bookStatus,
            bookrackConfigOptions: bookrackConfigOptions,
            bookTypeConfigs: bookTypeConfigs,
            uploadFile: uploadFile,
            previewImgUrl: previewImgUrl,
            handleAvatarSuccess: handleAvatarSuccess,
            total: total,
            pageDTO: pageDTO,
            books: books,
            handleBookSearch: handleBookSearch,
            onEnterBookSearch: onEnterBookSearch,
            handlePageChange: handlePageChange,
            dialogVisible: dialogVisible,
            handleDialog: handleDialog,
            handleCloseDialog: handleCloseDialog,
            handleConfirmUpdateBook: handleConfirmUpdateBook,
            handleAddBook: handleAddBook,
            handleDeleteBook: handleDeleteBook,
            isAddMode: isAddMode,
            handleUpdateBook: handleUpdateBook,
        };
    },
});
exports.default = (await Promise.resolve().then(() => __importStar(require('vue')))).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
