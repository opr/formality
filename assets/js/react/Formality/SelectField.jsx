import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';
import ValidationLabel from './ValidationLabel';
import {fromJS, List} from "immutable";

class SelectField extends React.Component {

    constructor(props) {
        super();
        const validationResult = props.validationFunction(props.value);
        this.state = {
            ...props,
            value: props.value,
            valid: validationResult.valid,
            validationMessage: props.validationMessages.get(validationResult.invalidRule)
        };
    }

    onChangeHandler(name, value) {
        const validationResult = this.props.validationFunction(value);
        this.setState({
            value: value,
            dirty: true,
            valid: validationResult.valid,
            validationMessage: this.props.validationMessages.get(validationResult.invalidRule)
        });
        this.props.setValue(name, value);
    }

    generateOptions() {
        let options = [];
        this.props.options.mapEntries(e => {
            options.push(<option key={e[0]} value={e[0]}>{e[1]}</option>);
        });
        return options;
    }


    render() {
        return (
            <div className={'form-row'}>
                <label htmlFor={'form-row__' + this.props.name}>{this.props.label}</label>
                <select value={this.state.value} onChange={e => this.onChangeHandler(this.props.name, e.target.value)}
                        className={'input-field --select'}
                        required={this.props.required}
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
        label: ownProps.label || '',
        options: ownProps.options || [],
        validationFunction: (ownProps.validationFunction instanceof Function) ? ownProps.validationFunction : () => {
            return {valid: true, invalidRule: 0}
        },
        validationMessages: fromJS(ownProps.validationMessages) || List()
    };
}, actionCreators)(SelectField);