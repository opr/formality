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
        expect(formPage.find(TextField).length).to.equal(1);
    });

    it('has the correct default validation message when one is not supplied', () => {
        const textField = mount(<Provider store={store}>{FieldFactory.makeField(Map({type: 'text', name: 'name'}))}</Provider>);
        expect(textField.find(TextField).props().validationMessage).to.equal('Invalid value');
    });
    it('has the correct validation message when one is supplied', () => {
        const textField = mount(<Provider store={store}>{FieldFactory.makeField(Map({type: 'text', name: 'name', validationMessage: 'wrong value'}))}</Provider>);
        expect(textField.find(TextField).props().validationMessage).to.equal('wrong value');
    });
});