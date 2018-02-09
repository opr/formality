import React from 'react';
import {getFormAttributes} from './Logic/formConfig';
import {getDefaultValues} from './Logic/Logic';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import reducer from './Logic/Reducer';
import FormPage from './FormPage';
import PageMarkers from './PageMarkers';
import FormControls from "./FormControls";

export default class Formality extends React.Component {

    constructor(props) {
        super();
        let reducerOptions = function() {};
        if(process.env.NODE_ENV !== 'production') {
            let extension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : function() {};
            reducerOptions = window.__REDUX_DEVTOOLS_EXTENSION__ && extension;
        }
        this.store = createStore(reducer, null, reducerOptions);
        this.store.dispatch({
            type: 'SET_STATE',
            payload: fromJS(props.formConfig)
        });
        this.store.dispatch({
            type: 'SET_DEFAULTS'
        });
        this.state = {...props, ...getFormAttributes(props.formConfig)};
    }


    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <form onSubmit={e => e.preventDefault()} action={this.state.action} method={this.state.method}>
                        <PageMarkers />
                        <FormPage />
                        <FormControls />
                    </form>
                </div>
            </Provider>
        );
    }
}