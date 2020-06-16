export const requiredField = (value) => {
    if (value) return undefined;
    return 'Поле является обязательным для заполнения!';
};

export const maxLength = (maxLength) => (value) => {
    if (value.length > maxLength) {
        return 'Максимальная длина ' + maxLength + " символов!";
    }
    return undefined;
};

