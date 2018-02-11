import React from 'react';
import TextField from './TextField';

export default class FieldFactory {

    static makeField(field) {
        switch(field.get('type')) {
            case 'text':
                return <TextField name={field.get('name')} key={field.get('name')} />;
            default :
                return null;
        }
    }
}