import React from 'react';
import TextField from './TextField';

export default class FieldFactory {

    static makeField(field) {
        let inner, validation = null;
        switch(field.get('type')) {
            case 'text':
                inner = <TextField name={field.get('name')} key={field.get('name')} />;
                break;
            default :
                inner = null;
        }

        return (<div key={'form-row__' + field.get('name')} className={'form-row'}>{inner}</div>);
    }
}