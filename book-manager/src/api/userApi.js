import request from "@/config/axios/axios.js";

// 注册用户
export const registerUserApi = (data) => {
    return request.post("/user/v1/register", data)
}

// 用户登入
export const userLoginApi = (data) => {
    return request.post('/user/v1/login', data);
}

// 获取当前用户信息
export const currentUserApi = () => {
    return request.get('/user/v1/current/user/detail')
}

// 分页查询用户列表
export const userPageApi = (data) => {
    return request.post('/user/v1/page', data)
}

// 修改用户信息
export const updateUserApi = (data) => {
    return request.post('/user/v1/update', data)
}

// 根据id获取用户信息
export const getUserByIdApi = (id) => {
    return request.get('/user/v1/user/detail?id=' + id)
}
