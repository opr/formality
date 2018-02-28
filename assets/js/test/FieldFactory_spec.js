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
import SelectField from '../react/Formality/SelectField';

describe('Field Factory', () => {

    const initialState = setDefaultVariables(fromJS(testForm)),
        store = createStore(reducer, initialState);

    it('creates a text field', () => {
        const textField = (FieldFactory.makeField(Map({type: 'text', name: 'name'})));
        let formPage = mount(<Provider store={store}>{textField}</Provider>);
        expect(formPage.find(TextField).length).to.equal(1);
    });

    it('creates a select field', () => {
        const selectField = (FieldFactory.makeField(Map({
            type: 'select',
            name: 'name',
            options: Map({scotland: 'Scotland', england: 'England', wales: 'Wales'})
        })));
        let formPage = mount(<Provider store={store}>{selectField}</Provider>);
        expect(formPage.find(SelectField).length).to.equal(1);
    });
});
