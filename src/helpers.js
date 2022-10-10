/**
 * Получаем данные пользователя из localstorage
 * @returns {any|null}
 */
export const getUserData = () => {
    try{
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    } catch (e) {
        return null;
    }
}

export const removeLocalStorageUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

/**
 * Генеррируем uid
 * @param length - длинна uid
 * @returns {string}
 */
export const makeuid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Получаем сообщение об ошибки сервера
 * @param resError - ответ сервера
 * @returns {string|*|string}
 */
export const getResponseErrorMessage = (resError) => {

    const errors = resError?.response?.data?.errors;
    const message = resError?.response?.data?.message;

    if(!errors && message){
        return message;
    }

    if(!errors){
        return 'Ошибка';
    }

    const firstError = errors[Object.keys(errors)[0]];

    if(!firstError){
        return 'Ошибка';
    }

    return firstError[0] ?? 'Ошибка';
}

/**
 * Получаем сообщения ошибки сервере в виде объекта
 * @param resError - ответ сервера
 * @returns {{error: string}|*}
 */
export const getResponseErrorFieldsMessage = (resError) => {

    const resultErrorsFields = { error: ''};
    const errors = resError?.response?.data?.errors;
    const message = resError?.response?.data?.message;

    if(!errors && message){
        return message;
    }

    if(!errors){
        resultErrorsFields.error = 'Ошибка';
        return resultErrorsFields;
    }

    Object.keys(errors).forEach(item => {
        resultErrorsFields[item] = errors[item][0];
    })

    return resultErrorsFields;
}

/**
 * Получаем сообщение ошибки валидации
 * @param validate - объект валидации (v$)
 * @param dirty - для уже затронутого плоя
 * @returns {{}}
 */
export const getValidateErrorMessage = (validate, dirty = true) => {

    const result = {};

    for(let field in validate){
        if(field[0] === '$'){
            continue;
        }

        if(dirty && validate[field].$dirty){
            result[field] = validate[field]?.$errors[0]?.$message;
        }
    }

    return result;
}