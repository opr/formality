import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import * as actionCreators from './Logic/actions';


class PageMarkers extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    generatePageMarkers() {
        let pageMarkers = [];

        for (let i = 0; i < this.props.numberOfPages - 1; i++) {
            pageMarkers.push(<div onClick={() => this.props.setPage(i)}
                                  className={'page-markers__marker' + ((this.props.currentPage === i) ? ' --active' : '')}
                                  key={'page-markers__marker__' + i}></div>)
        }

        return pageMarkers;
    }

    render() {

        return (
            <div className={'page-markers'}>
                {this.generatePageMarkers()}
            </div>
        );
    }
}

export default connect(state => {
    return {
        numberOfPages: (state.get('pages', List([])).count()) + 1,
        currentPage: state.get('currentPage')
    }
}, actionCreators)(PageMarkers);