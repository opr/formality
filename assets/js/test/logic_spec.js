import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {testForm} from "../react/Formality/Logic/testForm";
import {updateValue, nextPage, previousPage, setPage, setDefaultVariables} from "../react/Formality/Logic/Logic";

describe('Form logic', () => {

    const initialState =  setDefaultVariables(fromJS(testForm));

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
       expect(initialState.get('currentPage')).to.equal(0);
    });

    it('advances the page number', () => {
        expect(nextPage(initialState).get('currentPage')).to.equal(1);
    });

    it('advances the page number but not past the last page', () => {
        const initialState2 = setPage(initialState, initialState.get('pages').count()-1);
        expect(nextPage(initialState2).get('currentPage')).to.equal(initialState2.get('pages').count()-1);
    });

    it('reduces the page number', () => {
        expect(previousPage(nextPage(initialState)).get('currentPage')).to.equal(0);
    });

    it('reduces the page number', () => {
        expect(previousPage(initialState).get('currentPage')).to.equal(0);
    });

    it('sets the page number', () => {
        expect(setPage(initialState, 1).get('currentPage')).to.equal(1);
    });

    it('doesn\'t let the page number be advanced past the last page', () => {
        expect(setPage(initialState, 99).get('currentPage')).to.be.most(initialState.get('pages').count()-1);
    })
});