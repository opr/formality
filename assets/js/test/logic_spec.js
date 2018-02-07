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
       const initialState =  setDefaultVariables(fromJS(testForm));
       expect(initialState.get('currentPage')).to.equal(0);
    });

    it('advances the page number', () => {
        const initialState = setDefaultVariables(fromJS(testForm));
        expect(nextPage(initialState).get('currentPage')).to.equal(1);
    });

    it('reduces the page number', () => {
        const initialState = setDefaultVariables(fromJS(testForm));
        expect(previousPage(nextPage(initialState)).get('currentPage')).to.equal(0);
    });

    it('sets the page number', () => {
        const initialState = setDefaultVariables(fromJS(testForm));
        expect(setPage(initialState, 99).get('currentPage')).to.equal(99);
    });

    it('doesn\'t let the page number be advanced past the last page', () => {
        const initialState = setDefaultVariables(fromJS(testForm));
        expect(setPage(initialState, 99).get('currentPage')).to.equal(99);
    })
});