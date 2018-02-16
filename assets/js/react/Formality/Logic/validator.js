import {isImmutable, Map, List} from 'immutable';

export function validateEmail(email) {
    return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
}

export function validateRegex(text, pattern) {
    return text.match(pattern) !== null;
}

export function validateMinLength(str, length) {
    return str.length >= length;
}

export function validateMaxLength(str, length) {
    return str.length <= length;
}

export function generateValidationMessages(validation) {

    const defaultValidationMessage = 'Invalid value';
    let validationMessages = [];

    if (Map.isMap(validation)) {
        validation = List([validation]);
    }

    validation.map((e) => {
        validationMessages.push(e.get('validationMessage', defaultValidationMessage));
    });

    if (validationMessages.length === 0) {
        validationMessages = [defaultValidationMessage];
    }

    return List(validationMessages);
}

export function generateValidationFunction(rules) {

    return isImmutable(rules) ? value => {
        let valid,
            invalidRule = -1;

        if (Map.isMap(rules)) {
            rules = List([rules]);
        }

        for (let rule of rules.entries()) {
            const ruleNumber = rule[0];
            rule = rule[1];
            const maxLength = rule.get('maxLength', -1);
            valid = validateMinLength(value, rule.get('minLength', 0)) && ((maxLength === -1) || validateMaxLength(value, maxLength));
            if (rule.get('type') === 'email') {
                valid = valid && validateEmail(value);
            }
            if (rule.has('regex', '')) {
                valid = valid && validateRegex(value, rule.get('regex'))
            }
            if (!valid) {
                invalidRule = ruleNumber;
                break;
            }
        }
        return {valid, invalidRule}
    } : () => {
        return {valid: true} //return always valid if there are no rules
    };
}

export function handleChange(name, value, that) {
    const validationResult = that.state.validationFunction(value);
    that.setState({
        value: value,
        dirty: true,
        valid: validationResult.valid,
        validationMessage: that.state.validationMessages.get(validationResult.invalidRule)
    });
    that.props.setValue(name, value);
    //that.props.setPageValidity(name, validationResult.valid);
}