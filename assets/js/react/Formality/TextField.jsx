import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';
import ValidationLabel from './ValidationLabel';

class TextField extends React.Component {

    constructor(props) {
        super();
        this.state = {...props, value: props.value};
    }

    onChangeHandler(name, value) {
        this.setState({
            value: value
        });
        this.props.setValue(name, value);
    }

    render() {
        return (
            <div className={'form-row'}>
                <input value={this.state.value} onChange={e => this.onChangeHandler(this.props.name, e.target.value)} type={'text'}
                       placeholder={this.props.placeholder}
                       name={this.props.name}/>
                <ValidationLabel />
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        name: ownProps.name,
        value: state.getIn(['variables', ownProps.name], ''),
        placeholder: ownProps.placeholder
    };
}, actionCreators)(TextField);