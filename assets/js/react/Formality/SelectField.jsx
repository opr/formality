import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';
import ValidationLabel from './ValidationLabel';
import {fromJS, List} from "immutable";
import {handleChange} from "./Logic/validator";

class SelectField extends React.Component {

    constructor(props) {
        super();
        let validationMessages = props.validationMessages || List(['Invalid value']);
        let validationFunction = props.validationFunction || (() => {
            return {valid: true, message: 'Invalid value'}
        });
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

    generateOptions() {
        let options = [];

        if (this.props.defaultValue !== null) {
            options.push(<option key={this.props.name + '__default'}>{this.props.defaultValue}</option>);
        }
        this.props.options.mapEntries(e => {
            options.push(<option key={e[0]} value={e[0]}>{e[1]}</option>);
        });
        return options;
    }


    render() {
        return (
            <div className={'form-row'}>
                <label htmlFor={'form-row__' + this.state.name}>{this.state.label}</label>
                <select value={this.state.value} onChange={e => this.onChangeHandler(this.state.name, e.target.value)}
                        className={'input --select'}
                        required={this.state.required}
                        name={this.props.name}>
                    {this.generateOptions()}
                </select>
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
        options: ownProps.options || [],
        defaultValue: ownProps.defaultValue || null,
        label: ownProps.label || '',
        type: ownProps.type || 'text'
    };
}, actionCreators)(SelectField);