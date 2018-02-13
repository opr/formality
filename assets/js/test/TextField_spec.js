import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {findDOMNode} from 'react-dom';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import TextField from '../react/Formality/TextField';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../react/Formality/Logic/Reducer';

describe('TextField', () => {
    const initialState = fromJS(testForm),
        store = createStore(reducer, initialState),
        textField = mount(<Provider store={store}><TextField name={'test-field'} placeholder={'placeholder-text'} /></Provider>);

    it('makes a text field', () => {
        expect(findDOMNode(textField.instance()).querySelectorAll('input').length).to.equal(1);
    });

    it('makes a text field with the correct name and placeholder', () => {
        expect(findDOMNode(textField.instance()).querySelectorAll('input')[0].getAttribute('name')).to.equal('test-field');
        expect(findDOMNode(textField.instance()).querySelectorAll('input')[0].getAttribute('placeholder')).to.equal('placeholder-text');
    });

    it('updates the value in the variables list when text is changed', () => {
        textField.find(TextField).find('input').simulate('change', {target: {value: 'boots'}});
        expect(store.getState().getIn(['variables', 'test-field'])).to.equal('boots');
        textField.find(TextField).find('input').simulate('change', {target: {value: ''}});
        expect(store.getState().getIn(['variables', 'test-field'])).to.equal('');
    });
});