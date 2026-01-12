import request from "@/config/axios/axios.js";

// 书籍情况统计:预售、上架、借阅、收藏
export const bookStatBaseInfoApi = () => {
    return request.get("/book/stat/v1/base/info")
}
