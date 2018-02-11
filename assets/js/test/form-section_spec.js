import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import FormSection from '../react/Formality/FormSection';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../react/Formality/Logic/Reducer';


describe('FormSection', () => {
    const initialState = fromJS(testForm),
        store = createStore(reducer, initialState),
        formSection = mount(<Provider store={store}><FormSection section={0}/></Provider>);

    it('renders a form section', () => {
        expect(formSection.find('.form-section').length).to.equal(1);
    });
});