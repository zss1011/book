// 判断是否已新增空的书籍类型
export const hasEmptyBookType = (bookTypes) => {
    for (let bookType of bookTypes) {
        if (bookType.name === '') {
            return true;
        }
    }
    return false;
}
