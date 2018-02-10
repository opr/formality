import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import FormPage from '../react/Formality/FormPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {setDefaultVariables} from "../react/Formality/Logic/Logic";
import reducer from '../react/Formality/Logic/Reducer';

describe('form page', () => {

    const initialState = setDefaultVariables(fromJS(testForm)),
        store = createStore(reducer, initialState),
        formPage = mount(<Provider store={store}><FormPage/></Provider>);

    it('displays a form page', () => {
        expect(formPage.find('div').at(0).key()).to.equal('form-page');
    });

    it('displays a form page with an h2 with the correct title', () => {
        expect(formPage.find('h2').instance().innerHTML).to.equal(store.getState().getIn(['pages', store.getState().get('currentPage')]).get('name'));
    });

    it('displays the correct number of fieldsets', () => {
        expect(formPage.find('fieldset').length).to.equal(store.getState().getIn(['pages', store.getState().get('currentPage'), 'sections']).count());
    });

    it('displays the correct legends within the fieldsets', () => {
        expect(formPage.find('fieldset').at(0).find('legend').instance().innerHTML).to.equal(store.getState().getIn(['pages', store.getState().get('currentPage'), 'sections', 0, 'name']));
    });
});