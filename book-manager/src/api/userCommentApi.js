import request from "@/config/axios/axios.js";

// 获取:用户评论
export const getUserCommentsApi = (businessId) => {
    return request.get("/user/comment/v1/get?businessId=" + businessId);
}

// 新增:用户评论
export const addUserCommentApi = (data) => {
    return request.post('/user/comment/v1/add', data)
}

// 获取:所有用户评论
export const getAllUserCommentsApi = () => {
    return request.get('/user/comment/v1/all');
}

// 分页查询:用户评论
export const userCommentPageApi = (pageDTO) => {
    return request.post('/user/comment/v1/page', pageDTO);
}
