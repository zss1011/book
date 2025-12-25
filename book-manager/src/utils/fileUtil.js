// 触发文件下载
import {downloadFileApi} from "@/api/fileApi.js";

export function triggerDownload(res) {
    // 文件名
    let filename = 'download'
    const cd = res.headers?.['content-disposition']
    if (cd) {
        const m = cd.match(/filename\*?=UTF-8''([^;]+)|filename="([^"]+)"/i)
        if (m) filename = decodeURIComponent(m[1] || m[2])
    }

    const blob = res.data
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

// 图片预览
export const previewUrl = async (fileId) => {
    // 获取文件流
    const res = await downloadFileApi(fileId)
    const blob = res.data
    return URL.createObjectURL(blob)
}
