import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../react/SuperForm/Logic/Reducer';

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


    it('handles SET_DEFAULTS', () => {
        const initialState = Map();
        const action = {
            type: 'SET_DEFAULTS'
        };
        const nextState = reducer(initialState, action);
        expect(nextState.toJS()).to.include({currentPage: 0});
    });
});