import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';

class TextField extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return (
            <input onChange={e => this.props.setValue(this.props.name, e.target.value)} type={'text'} name={this.props.name}/>
        );
    }
}

export default connect((state, ownProps) => {
    return {
       name: ownProps.name,
       placeholder: ownProps.placeholder
    };
}, actionCreators)(TextField);