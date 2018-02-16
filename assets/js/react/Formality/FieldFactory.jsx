import React from 'react';
import TextField from './TextField';
import {Map, List} from 'immutable';
import {generateValidationFunction, generateValidationMessages} from './Logic/validator';
import SelectField from "./SelectField";

export default class FieldFactory {

    static makeField(field) {
        let inner = null,
            validationMessages = generateValidationMessages(field.get('validation', List([])));

        switch (field.get('type')) {
            case 'text':
                inner =
                    <TextField name={field.get('name')} key={field.get('name')}
                               label={field.get('label')}
                               type={'text'}
                               validationFunction={generateValidationFunction(field.get('validation'))}
                               validationMessages={validationMessages}
                               required={field.getIn(['validation', 'required'], false)}/>;
                break;
            case 'email':
                inner =
                    <TextField name={field.get('name')} key={field.get('name')}
                               label={field.get('label')}
                               type={'email'}
                               validationFunction={generateValidationFunction(field.get('validation'))}
                               validationMessages={validationMessages}
                               required={field.getIn(['validation', 'required'], false)}/>;
                break;
            case 'password':
                inner =
                    <TextField name={field.get('name')} key={field.get('name')}
                               label={field.get('label')}
                               type={'password'}
                               validationFunction={generateValidationFunction(field.get('validation'))}
                               validationMessages={validationMessages}
                               required={field.getIn(['validation', 'required'], false)}/>;
                break;
            case 'select':
                inner =
                    <SelectField name={field.get('name')} key={field.get('name')}
                                 label={field.get('label')}
                                 options={field.get('options')}
                                 defaultValue={field.get('defaultValue', null)}
                                 validationFunction={generateValidationFunction(field.get('validation'))}
                                 validationMessages={validationMessages}
                                 required={field.getIn(['validation', 'required'], false)}/>;
                break;
            default :
                inner = null;
        }

        return (<div key={'form-row__' + field.get('name')} className={'form-row'}>{inner}</div>);
    }
}