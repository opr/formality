import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import PageMarkers from '../react/Formality/PageMarkers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../react/Formality/Logic/Reducer';

describe('PageMarkers', () => {
    const initialState = fromJS(testForm),
        store = createStore(reducer, initialState),
        pageMarker = mount(<Provider store={store}><PageMarkers/></Provider>);

    it('does nothing if no pages are present', () => {
        const initialState = Map(),
            store = createStore(reducer, initialState),
            pageMarker = mount(<Provider store={store}><PageMarkers/></Provider>);
        expect(pageMarker.find(PageMarkers).find('.page-markers__marker').length).to.equal(0);
    });

    it('renders a PageMarkers component with the correct number of children divs', () => {
        expect(pageMarker.find(PageMarkers).find('.page-markers__marker').length).to.equal(initialState.get('pages').count());
    });

    it('moves to the correct page when clicked', () => {
        const secondPageButon = pageMarker.find(PageMarkers);
        secondPageButon.find('.page-markers__marker').at(1).simulate('click');
        expect(store.getState().get('currentPage')).to.equal(1);
        secondPageButon.find('.page-markers__marker').at(0).simulate('click');
        expect(store.getState().get('currentPage')).to.equal(0);
    });
});