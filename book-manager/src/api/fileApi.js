import request from "@/config/axios/axios.js";

// 上传文件
export const uploadFileApi = (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return request.post('/file/v1/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

// 下载文件
export const downloadFileApi = (fileId) => {
    return request.get('/file/v1/download?fileId=' + fileId, {
        responseType: 'blob'
    })
}
