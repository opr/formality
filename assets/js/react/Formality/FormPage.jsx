import React from 'react';
import {connect} from 'react-redux';

class FormPage extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return (
            <div className={'form-page'}>
                <h2>{this.props.name}</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.getIn(['pages', state.get('currentPage'), 'name'])
    }
}

export default connect(mapStateToProps)(FormPage);