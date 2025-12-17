import request from "@/config/axios/axios.js";

// 创建:富文本
export const createRichTextApi = (data) => {
    return request.post('/richText/v1/create/richText', data)
}

// 更新:富文本
export const updateRichTextApi = (data) => {
    return request.post('/richText/v1/update/richText', data)
}

// 分页查询:公告管理
export const richTextPageApi = (data) => {
    return request.post('/richText/v1/page', data)
}

// 删除:公告管理
export const deleteRichTextApi = (id) => {
    return request.get('/richText/v1/delete?id=' + id)
}

// 根据id获取公告
export const richTextDetailApi = (id) => {
    return request.get('/richText/v1/detail?id=' + id)
}
