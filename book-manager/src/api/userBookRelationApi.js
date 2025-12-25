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
