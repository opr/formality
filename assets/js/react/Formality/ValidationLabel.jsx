import React from 'react';
import {connect} from 'react-redux';

class ValidationLabel extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return (
        <div>error</div>
        );
    }
}

export default connect((state, ownProps) => {
    return {

    }
})(ValidationLabel);