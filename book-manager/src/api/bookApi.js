import request from "@/config/axios/axios.js";

// 分页查询:书籍
export const bookPageApi = (data) => {
    return request.post('/book/v1/page', data)
}

// 新增书籍
export const addBookApi = (data) => {
    return request.post('/book/v1/add', data)
}

// 删除:书籍
export const deleteBookApi = (bookId) => {
    return request.get('/book/v1/delete?bookId=' + bookId)
}

// 获取:书籍详情
export const bookDetailApi = (bookId) => {
    return request.get('/book/v1/detail?bookId=' + bookId);
}

// 修改:书籍
export const updateBookApi = (book) => {
    return request.post('/book/v1/update', book)
}
