import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';
import FieldFactory from './FieldFactory'

class FormSection extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        let fields = [];

        for (let f of this.props.fields.values()) {
            fields.push(FieldFactory.makeField(f, this.props.variables));
        }

        return (
            <div className={'form-section'}>{fields}</div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        variables: state.get('variables', List()),
        fields: state.getIn(['pages', state.get('currentPage'), 'sections', ownProps.section, 'fields'], List())
    };
})(FormSection);
