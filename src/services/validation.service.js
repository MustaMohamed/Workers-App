import { validationConstants } from '../constants';

export const isEmpty = (data) => {
    return data === undefined || data === null || data === {} || data === [] || data === '' || data === "" || data === 0;
};

export const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const containsSpecialCharacters = (value) => {
    if (/[^a-zA-Z0-9\-\/_]/.test(value)) {
        alert('Input is not alphanumeric');
        return false;
    }
    return true;
};

export const validateInput = (validationTypes, inputValue) => {
    let valid = true;
    validationTypes.forEach((item, idx) => {
        switch (item) {
            case validationConstants.NOT_EMPTY:
                valid = valid && ( !isEmpty(inputValue) );
                break;
            case validationConstants.VALID_EMAIL:
                valid = valid && isValidEmail(inputValue);
                break;
            case validationConstants.CONTAINS_SPECIAL_CHARACTERS:
                valid = valid && ( !containsSpecialCharacters(inputValue) );
                break;
        }
    });
    return valid;
};

export default {
    isEmpty,
    isValidEmail,
    validateInput,
    containsSpecialCharacters
}