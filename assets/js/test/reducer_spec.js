import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {testForm} from "../react/Formality/Logic/testForm";
import reducer from '../react/Formality/Logic/Reducer';

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            payload: Map({
                formName: 'My Form',
                formMethod: 'post'
            })
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            formName: 'My Form',
            formMethod: 'post'
        }));
    });

    it('handles SET_PAGE', () => {
        const initialState = fromJS(testForm);
        const action = {
          type: 'SET_PAGE',
          page: 1
        };
        const nextState = reducer(initialState, action);
        expect(nextState.get('currentPage')).to.equal(1);
    });


    it('handles SET_DEFAULTS', () => {
        const initialState = Map();
        const action = {
            type: 'SET_DEFAULTS'
        };
        const nextState = reducer(initialState, action);
        expect(nextState.toJS()).to.include({currentPage: 0});
    });

    it('handles SET_VALUE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_VALUE',
            key: 'testValue',
            value: 12345
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(Map({
            variables: Map({
                testValue: 12345
            })
        }));
    })
});