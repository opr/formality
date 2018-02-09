import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import * as actionCreators from './Logic/actions';


class PageMarkers extends React.Component {

    constructor(props) {
        super();
        let pageMarkers = [];

        for (let i = 0; i < props.numberOfPages-1; i++) {
            pageMarkers.push(<div onClick={() => props.setPage(i)} className={'page-markers__marker'} key={'page-markers__marker__' + i}></div>)
        }
        this.state = {...props, pageMarkers: pageMarkers};
    }

    render() {
        return (
            <div className={'page-markers'}>
                {this.state.pageMarkers}
            </div>
        );
    }
}

export default connect(state => {
    return {
        numberOfPages: (state.get('pages', List([])).count()) + 1
    }
}, actionCreators)(PageMarkers);