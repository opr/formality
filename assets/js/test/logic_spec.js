import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {testForm} from "./testForm";
import {updateValue, nextPage, previousPage, setPage, setDefaultVariables} from "../react/SuperForm/Logic/Logic";

describe('Form logic', () => {

    it('updates a value in the variable list', () => {
        const initialState = Map({
            name: 'Thomas',
            age: 18,
            gender: 'Male'
        });
        expect(updateValue(initialState, 'name', 'Jason')).to.equal(
            Map({
                name: 'Jason',
                age: 18,
                gender: 'Male'
            })
        )
    });

    it('gets all required variables', () => {
       const initialState =  fromJS(testForm);
       expect(setDefaultVariables(initialState));
    });
});