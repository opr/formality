import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import React from 'react';
import {testForm} from "../react/Formality/Logic/testForm";
import {mount} from 'enzyme';
import FormControls from '../react/Formality/FormControls';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from '../react/Formality/Logic/Reducer';

describe('Form controls', () => {
   const formControls = mount(<Provider store={store}><FormControls /></Provider>)

    it('renders only the next button if it is on the first page', () => {

    });
});