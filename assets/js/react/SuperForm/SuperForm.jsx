import React from 'react';
import {getFormAttributes} from './Logic/formConfig';

export default class SuperForm extends React.Component {

    constructor(props) {
        super();
        this.state = {...props, ...getFormAttributes(props.formConfig)};
    }

    componentDidCatch(error, info) {
        console.log('errorred in component');
    }

    render() {
        return (
        <div>
            <form action={this.state.action} method={this.state.method}></form>
        </div>
        );
    }
}