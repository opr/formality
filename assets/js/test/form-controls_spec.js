import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import FormControls from '../react/Formality/FormControls';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {setDefaultVariables} from "../react/Formality/Logic/Logic";
import reducer from '../react/Formality/Logic/Reducer';

describe('Form controls', () => {
    const initialState = setDefaultVariables(fromJS(testForm)),
        store = createStore(reducer, initialState),
        formControls = mount(<Provider store={store}><FormControls /></Provider>);

    it('renders only the next button if it is on the first page', () => {
        expect(formControls.find('button').length).to.equal(1);
        expect(formControls.find('button').at(0).key()).to.equal('next');
    });

    it('renders next and previous buttons on a "middle" page', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'NEXT_PAGE'});
        const formControls = mount(<Provider store={store}><FormControls /></Provider>);
        expect(formControls.find('button').length).to.equal(2);
        expect(formControls.find('button').at(0).key()).to.equal('previous');
        expect(formControls.find('button').at(1).key()).to.equal('next');
    });

    it('does not render the next button on the last page, and renders the submit button and the previous button', () => {
        const store = createStore(reducer, initialState);
        store.dispatch({type: 'SET_PAGE', page: store.getState().get('pages').count()-1});
        const formControls = mount(<Provider store={store}><FormControls /></Provider>);
        expect(formControls.find('button').length).to.equal(2);
        expect(formControls.find('button').at(0).key()).to.not.equal('next');
        expect(formControls.find('button').at(0).key()).to.equal('previous');
        expect(formControls.find('button').at(1).key()).to.equal('submit');
    });

    it('clicking the next button makes you go to the next page', () => {
        expect(formControls.find('button').length).to.equal(1);
        expect(formControls.find('button').at(0).key()).to.equal('next');
        formControls.find('button').at(0).simulate('click');
        expect(store.getState().get('currentPage')).to.equal(1);
    });
});