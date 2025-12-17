import request from "@/config/axios/axios.js";

// 查询:书架配置
export const getBookrackConfigApi = () => {
    return request.get('/system/config/v1/bookrack')
}

// 查询:书籍类别
export const getBookTypeConfigApi = () => {
    return request.get('/system/config/v1/book/type')
}

// 修改:书籍类别
export const updateBookTypeConfigApi = (oldBookType, newBookType) => {
    return request.get('/system/config/v1/book/type/update?oldBookType=' + oldBookType + '&newBookType=' + newBookType)
}

// 删除:书籍类别
export const deleteBookTypeConfigApi = (bookType) => {
    return request.get('/system/config/v1/book/type/delete?bookType=' + bookType)
}

// 新增:书籍类别
export const addBookTypeConfigApi = (bookType) => {
    return request.get('/system/config/v1/book/type/add?bookType=' + bookType)
}

// 修改:书架配置
export const updateBookrackConfigApi = (oldBookrack, newBookrack) => {
    return request.get('/system/config/v1/bookrack/update?oldBookrack=' + oldBookrack + '&newBookrack=' + newBookrack)
}

// 删除:书架配置
export const deleteBookrackConfigApi = (bookrack) => {
    return request.get('/system/config/v1/bookrack/delete?bookrack=' + bookrack)
}
