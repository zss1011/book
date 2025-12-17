export const hasEmptyBookrack = (bookracks) => {
    for (let bookrack of bookracks) {
        if (bookrack.id > 10000) {
            return true;
        }
    }
    return false;
}
