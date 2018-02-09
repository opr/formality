import {fromJS} from 'immutable';

export function getFormAttributes(formConfig = {}) {
    formConfig = fromJS(formConfig);
    let method = formConfig.get('formMethod') ? formConfig.get('formMethod') : 'get',
        action = formConfig.get('formAction') ? formConfig.get('formAction') : '/';
    return {method, action}
}