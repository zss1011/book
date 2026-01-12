import request from "@/config/axios/axios.js";

// 用户书籍操作:订阅、收藏、借阅
export const userBookOperationApi = (data) => {
    return request.post("/user/book/relation/v1/operation", data);
}

// 分页查询:用户已收藏书籍
export const userBookRelationPageApi = (data) => {
    return request.post('/user/book/relation/v1/page', data)
}

// 分页查询:用户已订阅书籍
export const userBookSubscriptionPageApi = (data) => {
    return request.post('/user/book/relation/v1/subscription/page', data)
}

// 分页查询:用户已借阅书籍
export const userBookBorrowPageApi = (data) => {
    return request.post('/user/book/relation/v1/borrow/page', data)
}

// 分页查询:用户订阅的书籍上架通知
export const subscriptionBookAddedPageApi = (data) => {
    return request.post('/user/book/relation/v1/subscription/book/added/page', data)
}

// 用户阅读:书籍上架消息
export const readBookAddedMessageApi = (id) => {
    return request.get('/user/book/relation/v1/read/book/added/message?id=' + id)
}

// 用户全部阅读:书籍上架消息
export const readAllBookAddedMessageApi = (userId) => {
    return request.get('/user/book/relation/v1/read/all/book/added/message?userId=' + userId)
}

// 删除:书籍上架消息
export const deleteBookAddedMessageApi = (id) => {
    return request.get('/user/book/relation/v1/delete/book/added/message?id=' + id)
}

// 分页查询:管理员端用户借阅记录
export const adminBookBorrowPageApi = (data) => {
    return request.post('/user/book/relation/v1/admin/book/borrow/page', data)
}

// 删除:用户借阅记录
export const deleteBookBorrowApi = (id) => {
    return request.get('/user/book/relation/v1/delete/book/borrow?id=' + id)
}

// 管理员分页查询:用户已订阅书籍
export const adminUserBookSubscriptionPageApi = (data) => {
    return request.post('/user/book/relation/v1/admin/subscription/page', data)
}
