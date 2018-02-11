import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {testForm} from "../react/Formality/Logic/testForm";
import {
    updateValue,
    nextPage,
    previousPage,
    setPage,
    setDefaultVariables,
    setValue
} from "../react/Formality/Logic/Logic";

describe('Form logic', () => {

    const initialState = setDefaultVariables(fromJS(testForm));

    it('gets all required variables', () => {
        expect(initialState.get('currentPage')).to.not.be.an('undefined');
        expect(initialState.get('variables')).to.not.be.an('undefined');
    });

    it('advances the page number', () => {
        expect(nextPage(initialState).get('currentPage')).to.equal(1);
    });

    it('advances the page number but not past the last page', () => {
        const initialState2 = setPage(initialState, initialState.get('pages').count() - 1);
        expect(nextPage(initialState2).get('currentPage')).to.equal(initialState2.get('pages').count() - 1);
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
        expect(setPage(initialState, 99).get('currentPage')).to.be.most(initialState.get('pages').count() - 1);
    });

    it('sets the value of the variables map correctly', () => {
        expect(setValue(Map(), 'name', 'Thomas')).to.equal(Map({variables: Map({name: 'Thomas'})}));
    });
});