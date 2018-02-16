import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';
import ValidationLabel from './ValidationLabel';
import {handleChange} from './Logic/validator';
import {fromJS, List} from "immutable";

class TextField extends React.Component {

    constructor(props) {
        super();
        let validationMessages = props.validationMessages || List(['Invalid value']);
        let validationFunction = props.validationFunction || (() => { return {valid: true, message: 'Invalid value'} });
        const validationResult = validationFunction(props.value);

        this.state = {
            ...props,
            value: props.value,
            valid: validationResult.valid,
            validationFunction: validationFunction,
            validationMessages,
            validationMessage: validationMessages.get(validationResult.invalidRule)
        };
    }

    onChangeHandler(name, value) {
        handleChange(name, value, this);
    }

    render() {
        return (
            <div className={'form-row'}>
                <label htmlFor={'form-row__' + this.props.name}>{this.props.label}</label>
                <input value={this.state.value} onChange={e => this.onChangeHandler(this.props.name, e.target.value)}
                       type={this.props.type}
                       placeholder={this.props.placeholder}
                       className={'input --text --' + this.props.type}
                       required={this.props.required}
                       name={this.props.name}/>
                <ValidationLabel show={!this.state.valid && this.state.dirty} message={this.state.validationMessage}/>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        name: ownProps.name,
        value: state.getIn(['variables', ownProps.name], ''),
        dirty: state.hasIn(['variables', ownProps.name]),
        placeholder: ownProps.placeholder,
        required: ownProps.required,
        label: ownProps.label || '',
        type: ownProps.type || 'text'
    };
}, actionCreators)(TextField);