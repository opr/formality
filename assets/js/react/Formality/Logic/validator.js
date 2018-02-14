import {isImmutable} from 'immutable';

export function validateEmail(email) {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
}

export function validateMinLength(str, length) {
    return str.length >= length;
}

export function validateMaxLength(str, length) {
    return str.length <= length;
}

export function generateValidationFunction(rules) {
    if(!isImmutable(rules)) {
        return () => {return true};
    }
    return value => {
        let valid = true;
        const maxLength = rules.get('maxLength', -1);
        valid = rules.get('minLength', 0) <= value.length && ((maxLength === -1) || ((maxLength !== -1) && value.length <= maxLength));
        if(rules.get('type') === 'email') {
            valid = validateEmail(value);
        }
        return valid;
    };
}