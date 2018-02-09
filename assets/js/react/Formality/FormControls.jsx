import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './Logic/actions';

class FormControls extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        const prevButton = this.props.firstPage ? null : (<button onClick={this.props.previousPage}>Previous</button>),
            nextButton = this.props.lastPage ? null : (<button onClick={this.props.nextPage}>Next</button>);

        return (
            <div className={'form-controls'}>
                {prevButton}{nextButton}
            </div>
        );
    }
}

export default connect(state => {
    return {
        lastPage: state.get('pages').count() - 1 === state.get('currentPage'),
        firstPage: state.get('currentPage') === 0
    }
}, actionCreators)(FormControls);