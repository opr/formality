import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';
import ValidationLabel from './ValidationLabel';

class TextField extends React.Component {

    constructor(props) {
        super();
        this.state = {...props, value: props.value, valid: props.validationFunction(props.value) };
    }

    onChangeHandler(name, value) {
        this.setState({
            value: value,
            dirty: true,
            valid: this.props.validationFunction(value)
        });
        this.props.setValue(name, value);
    }

    render() {
        return (
            <div className={'form-row'}>
                <label htmlFor={'form-row__' + this.props.name}>{this.props.label}</label>
                <input value={this.state.value} onChange={e => this.onChangeHandler(this.props.name, e.target.value)} type={this.props.type}
                       placeholder={this.props.placeholder}
                       required={this.props.required}
                       name={this.props.name}/>
                <ValidationLabel show={!this.state.valid && this.state.dirty} message={this.props.validationMessage} />
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
        type: ownProps.type || 'text',
        validationFunction: (ownProps.validationFunction instanceof Function) ? ownProps.validationFunction : () => true,
        validationMessage: ownProps.validationMessage
    };
}, actionCreators)(TextField);