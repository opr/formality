import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import FormSection from './FormSection';

class FormPage extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {

        let sections = [],
            counter = 0;
        for(let s of this.props.sections) {
            sections.push(<fieldset key={s.get('name')} className={'form-page__fieldset'}><legend>{s.get('name')}</legend>
            <div className={'form-page__section'}><FormSection section={counter++} /></div></fieldset>);
        }

        return (
            <div key={'form-page'} className={'form-page'}>
                <h2>{this.props.name}</h2>
                <div className={'form-page__page-container'}>
                    {sections}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.getIn(['pages', state.get('currentPage'), 'name'], ''),
        sections: state.getIn(['pages', state.get('currentPage'), 'sections'], List())
    }
}

export default connect(mapStateToProps)(FormPage);