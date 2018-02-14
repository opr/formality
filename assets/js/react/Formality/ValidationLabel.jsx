import React from 'react';
import {connect} from 'react-redux';

class ValidationLabel extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return this.props.show ? (
        <div>{this.props.message}</div>
        ) : null;
    }
}

export default connect((state, ownProps) => {
    return {
        message: ownProps.message,
        show: ownProps.show
    }
})(ValidationLabel);