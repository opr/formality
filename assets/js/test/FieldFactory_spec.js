import FieldFactory from '../react/Formality/FieldFactory';
import {fromJS, Map} from 'immutable';
import {mount} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import {expect} from 'chai';
import TextField from '../react/Formality/TextField';
import {setDefaultVariables} from '../react/Formality/Logic/Logic';
import {createStore} from 'redux';
import {testForm} from '../react/Formality/Logic/testForm';
import reducer from '../react/Formality/Logic/Reducer';

describe('Field Factory', () => {

    const initialState = setDefaultVariables(fromJS(testForm)),
        store = createStore(reducer, initialState);

    it('creates a text field', () => {
        const textField = (FieldFactory.makeField(Map({type: 'text', name: 'name'})));
        let formPage = mount(<Provider store={store}><TextField/></Provider>);
        //expect(mount(<Provider store={store}></Provider>));
    });
});