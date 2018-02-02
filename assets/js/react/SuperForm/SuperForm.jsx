import React from 'react';

export default class SuperForm extends React.Component {

    constructor(props) {
        super();
        this.state = {...props};
    }

    render() {
        return (
        <div>super form</div>
        );
    }
}