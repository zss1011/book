// 创建uuid
export const getUuid = () => {
    return crypto.randomUUID().replaceAll('-', '')
}
