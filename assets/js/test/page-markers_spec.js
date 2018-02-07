import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "./testForm";
import {shallow, mount} from 'enzyme';
import PageMarkers from '../react/SuperForm/PageMarkers';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../react/SuperForm/Logic/Reducer';

describe('PageMarkers', () => {
    const initialState =  fromJS(testForm);
    it('does nothing if no pages are present', () => {
        let store = createStore(reducer, initialState);
        const pageMarker = mount(<Provider store={store}><PageMarkers /></Provider>);
        expect(pageMarker.find(PageMarkers).find('.page-markers__page-marker').length).to.equal(0);
    });

   it('renders a PageMarkers component with the correct number of children divs', () => {
       let store = createStore(reducer, initialState);
       const pageMarker = mount(<Provider store={store}><PageMarkers /></Provider>);
       expect(pageMarker.find(PageMarkers).find('.page-markers__marker').length).to.equal(2);
   });
});