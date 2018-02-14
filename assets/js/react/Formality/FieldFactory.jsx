import React from 'react';
import TextField from './TextField';
import {generateValidationFunction} from './Logic/validator';

export default class FieldFactory {

    static makeField(field) {
        const defaultValidationMessage = 'Invalid value';
        let inner, validation = null;

        switch (field.get('type')) {
            case 'text':
                inner =
                    <TextField name={field.get('name')} key={field.get('name')}
                               label={field.get('label')}
                               type={'text'}
                               validationFunction={generateValidationFunction(field.get('validation'))}
                               validationMessage={field.get('validationMessage', defaultValidationMessage)}
                               required={field.getIn(['validation', 'required'], false)}/>;
                break;
                case 'email':
                inner =
                    <TextField name={field.get('name')} key={field.get('name')}
                               label={field.get('label')}
                               type={'email'}
                               validationFunction={generateValidationFunction(field.get('validation'))}
                               validationMessage={field.get('validationMessage', defaultValidationMessage)}
                               required={field.getIn(['validation', 'required'], false)}/>;
                break;
            default :
                inner = null;
        }

        return (<div key={'form-row__' + field.get('name')} className={'form-row'}>{inner}</div>);
    }
}