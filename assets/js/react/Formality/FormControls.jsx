import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import * as actionCreators from './Logic/actions';

class FormControls extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        const prevButton = this.props.firstPage ? null : <button key={'previous'} onClick={this.props.previousPage}>Previous</button>,
            nextButton = this.props.lastPage ? null : (<button key={'next'} onClick={this.props.nextPage}>Next</button>),
            submitButton = this.props.lastPage ? (<button key={'submit'}>Submit</button>) : null;

        return (
            <div className={'form-controls'}>
                {prevButton}{nextButton}{submitButton}
            </div>
        );
    }
}

export default connect(state => {
    return {
        lastPage: state.get('pages', List()).count() - 1 === state.get('currentPage'),
        firstPage: state.get('currentPage') === 0
    }
}, actionCreators)(FormControls);