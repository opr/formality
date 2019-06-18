import {expect} from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import {List, Map} from 'immutable';
import React from 'react';
import {findLinkedFields, isFieldValid} from '../src/react/Formality/validation';

describe('Validation', () => {
  const test = sinonTest(sinon);
  describe('is field valid', () => {

    let state = Map({
      data: Map({
        entities: Map({
          fields: Map({
            '0': Map({
              value: 'd'
            })
          })
        })
      })
    });
    const permanentState = state;

    beforeEach(() => {
      state = permanentState;
    });

    it('says a field is valid if there is no validation rule in it', () => {
      expect(isFieldValid(state, '2', 'ddd')).to.be.true;
    });

    describe('length', () => {
      it('says a field is valid if there is no length rule in validation', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({field: 2}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is valid if the length is more than the length validation criterion', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({length: 2}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });


      it('says a field is valid if the length is more than or equal to the length validation criterion', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({length: 3}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is invalid if the length is less than the length validation criterion', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({length: 20}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.false;
      });
    });

    describe('regex', () => {

      it('says a field is valid if no regex option is in validation', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({field: 2}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });


      it('says a field is valid if a regex option is supplied and the value matches it', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          regex: /^[a-zA-Z]*$/
        }));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is not valid if a regex option is supplied and the value does not match it', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          regex: /^[a-zA-Z]*$/
        }));
        expect(isFieldValid(state, '0', 'dd934d')).to.be.false;
      });

    });

    describe('required', () => {

      it('says a field is valid if no required option is in validation', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({field: 2}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });


      it('says a field is valid if a required option is supplied and there is a value', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          required: true
        }));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is not valid if a required option is supplied and the value is empty', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          required: true
        }));
        expect(isFieldValid(state, '0', '')).to.be.false;
      });

      it('says a field is not valid if a required option is supplied and the value is undefined', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          required: true
        }));
        expect(isFieldValid(state, '0')).to.be.false;
      });

      it('says a field is valid if a required option is false', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          required: false
        }));
        expect(isFieldValid(state, 'twr')).to.be.true;
      });

    });

    describe('compareTo', () => {

      it('says a field is valid if no compare option is in validation', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({field: 2}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is valid if compare option is in validation but the compare key doesn\'t exist in the fields', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({compareTo: 'test-field'}));
        expect(isFieldValid(state, '0', 'ddd')).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, but no equality operator is supplied (defaults to ===)', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({compareTo: 'test-field'})).setIn(['data', 'entities', 'fields', '5'], Map({
          name: 'test-field',
          value: 'testvalue'
        }));
        expect(isFieldValid(state, '0', 'testvalue')).to.be.true;
      });

      it('says a field is not valid if compare option is in validation and compare key exists and has a different value, but no equality operator is supplied (defaults to ==)', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({compareTo: 'test-field'})).setIn(['data', 'entities', 'fields', '5'], Map({
          name: 'test-field',
          value: 'testvalue'
        }));
        expect(isFieldValid(state, '0', 'testvalufe')).to.be.false;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has a different value, but equality operator is !=', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '!='
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'testvalue'}));
        expect(isFieldValid(state, '0', 'testvalufe')).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is ==', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '=='
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'testvalue'}));
        expect(isFieldValid(state, '0', 'testvalue')).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is ==, and compare as is set to int and the values are strings', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '==',
          compareAs: 'int'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '0'}));
        expect(isFieldValid(state, '0', '0')).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is ==, and compare as is set to int and the values are already ints', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '==',
          compareAs: 'int'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 0}));
        expect(isFieldValid(state, '0', 0)).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is ==, and compare as is set to int and one of the value is an int and the other is string', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '==',
          compareAs: 'int'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '0'}));
        expect(isFieldValid(state, '0', 0)).to.be.true;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has the same value, and equality operator is ==, and compare as is set to int and one of the value is an int and the other is a string representing a different integer', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '==',
          compareAs: 'int'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2'}));
        expect(isFieldValid(state, '0', 0)).to.be.false;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is !=, and compare as is set to int and one of the value is an int and the other is a string representing a different integer', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '!=',
          compareAs: 'int'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2'}));
        expect(isFieldValid(state, '0', 0)).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is !=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '!=',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.5'}));
        expect(isFieldValid(state, '0', 0.1)).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is !=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '==',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.5'}));
        expect(isFieldValid(state, '0', 2.5)).to.be.true;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has a less than value, and equality operator is >, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '>',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.5'}));
        expect(isFieldValid(state, '0', 2.4)).to.be.false;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has a greater than value, and equality operator is >, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '>',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.3'}));
        expect(isFieldValid(state, '0', 2.4)).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has a less than value, and equality operator is <, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '<',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.3'}));
        expect(isFieldValid(state, '0', 2.2)).to.be.true;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has a less than value, and equality operator is <, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '<',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.3'}));
        expect(isFieldValid(state, '0', 2.6)).to.be.false;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has a less than value, and equality operator is <=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '<=',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.3'}));
        expect(isFieldValid(state, '0', 2.6)).to.be.false;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is <=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '<=',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.6'}));
        expect(isFieldValid(state, '0', 2.6)).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has the same value, and equality operator is >=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '>=',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.6'}));
        expect(isFieldValid(state, '0', 2.6)).to.be.true;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has the same value, and equality operator is >=, and compare as is set to float and one of the value is an int and the other is a string representing a different float', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '>=',
          compareAs: 'float'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: '2.6'}));
        expect(isFieldValid(state, '0', 2.2)).to.be.false;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has one truthy value, and one falsy value and compare operator is &&', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '&&'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: false}));
        expect(isFieldValid(state, '0', 2.2)).to.be.false;
      });

      it('says a field is valid if compare option is in validation and compare key exists and has two truthy values and compare operator is &&', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareOperator: '&&'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: true}));
        expect(isFieldValid(state, '0', 2.2)).to.be.true;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has one truthy value and compare operator is && and compareAs is string, but one is an empty string', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareAs: 'string',
          compareOperator: '&&'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: ''}));
        expect(isFieldValid(state, '0', 2.2)).to.be.false;
      });

      it('says a field is invalid if compare option is in validation and compare key exists and has both falsy values and operator is || and compareAs is string and both are empty strings', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareAs: 'string',
          compareOperator: '||'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: ''}));
        expect(isFieldValid(state, '0', '')).to.be.false;
      });

      it('says a field is valid if compare option is in validation and compare key exists and one value is truthy and operator is || and compareAs is string and one is an empty string', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareAs: 'string',
          compareOperator: '||'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: ''}));
        expect(isFieldValid(state, '0', 'a')).to.be.true;
      });

      it('says a field is valid if compare option is in validation and compare key exists and both values strictly match but compareOperator is an invalid option', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], Map({
          compareTo: 'test-field',
          compareAs: 'string',
          compareOperator: '|sd|'
        })).setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'a'}));
        expect(isFieldValid(state, '0', 'a')).to.be.true;
      });

      it('if you supply a list in validation, (i.e. a list of many validation criteria) then it does .every on each boolean returned object, if all entries are valid, then all should pass', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], List([
          Map({
            compareTo: 'test-field',
            compareAs: 'string',
            compareOperator: '||'
          }),
          Map({
            compareTo: 'test-field-2',
            compareAs: 'string',
            compareOperator: '=='
          })
        ]))
          .setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'b'}))
          .setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field-2', value: 'a'}));
        expect(isFieldValid(state, '0', 'a').get('valid')).to.be.true;
      });

      it('if you supply a list in validation, (i.e. a list of many validation criteria) then it does .every on each boolean returned object, if one entry is invalid, then it should return false', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], List([
          Map({
            compareTo: 'test-field',
            compareAs: 'string',
            compareOperator: '=='
          }),
          Map({
            compareTo: 'test-field-2',
            compareAs: 'string',
            compareOperator: '=='
          })
        ]))
          .setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'b'}))
          .setIn(['data', 'entities', 'fields', '6'], Map({name: 'test-field-2', value: 'a'}));
        expect(isFieldValid(state, '0', 'a').get('valid')).to.be.false;
      });

      it('if you supply a list in validation, (i.e. a list of many validation criteria) then it does .every on each boolean returned object, if one entry is invalid, then it should return false, and the invalid rule will be the failing rule', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], List([
          Map({
            compareTo: 'test-field',
            compareAs: 'string',
            compareOperator: '=='
          }),
          Map({
            compareTo: 'test-field-2',
            compareAs: 'string',
            compareOperator: '=='
          })
        ]))
          .setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'b'}))
          .setIn(['data', 'entities', 'fields', '6'], Map({name: 'test-field-2', value: 'a'}));
        expect(isFieldValid(state, '0', 'a').get('invalidRule')).to.equal(0);
      });

      it('if you supply a list in validation, (i.e. a list of many validation criteria) then it does .every on each boolean returned object, if one entry is invalid, then it should return false, and the invalid rule will be the failing rule', () => {
        state = state.setIn(['data', 'entities', 'fields', '0', 'validation'], List([
          Map({
            compareTo: 'test-field',
            compareAs: 'string',
            compareOperator: '=='
          }),
          Map({
            compareTo: 'test-field-2',
            compareAs: 'string',
            compareOperator: '=='
          })
        ]))
          .setIn(['data', 'entities', 'fields', '5'], Map({name: 'test-field', value: 'b'}))
          .setIn(['data', 'entities', 'fields', '6'], Map({name: 'test-field-2', value: 'a'}));
        expect(isFieldValid(state, '0', 'b').get('invalidRule')).to.equal(1);
      });

    });

  });

  describe('findLinkedFields', () => {

    let state = Map({
      data: Map({
        entities: Map({
          fields: Map({
            '0': Map({
              id: 0,
              name: 'field-a',
              validation: Map({
                compareTo: 'field-d'
              })
            }),
            '1': Map({
              id: 1,
              name: 'field-b',
              validation: Map({
                compareTo: 'field-d'
              })
            }),
            '2': Map({
              id: 2,
              name: 'field-c',
              validation: Map({
                compareTo: 'field-d'
              })
            }),
            '3': Map({
              id: 3,
              name: 'field-d',
              value: 'b'
            })
          })
        })
      })
    });
    const permanentState = state;

    beforeEach(() => state = permanentState);

    it('given a state where fields a, b and c all compare to field d, then findLinkedFields on field d returns the ids of fields a, b, and c', () => {
      const linkedFields = findLinkedFields(state, 3);
      const expected = List([0, 1, 2]);
      expect(expected).to.deep.equal(linkedFields);
    });

    it('given a state where fields a, b and c all compare to field d, then findLinkedFields on field d returns the ids of fields a, b, and c', () => {
      let state = Map({
        data: Map({
          entities: Map({
            fields: Map({
              '0': Map({
                id: 0,
                name: 'field-a',
                validation: List([
                  Map({
                    compareTo: 'field-d'
                  }),
                  Map({
                    compareTo: 'field-c'
                  })
                ])
              }),
              '1': Map({
                id: 1,
                name: 'field-b',
                validation: Map({
                  compareTo: 'field-d'
                })
              }),
              '2': Map({
                id: 2,
                name: 'field-c',
                validation: Map({
                  compareTo: 'field-d'
                })
              }),
              '3': Map({
                id: 3,
                name: 'field-d',
                value: 'b'
              })
            })
          })
        })
      });
      const linkedFields = findLinkedFields(state, 3);
      const expected = List([0, 1, 2]);
      expect(expected).to.deep.equal(linkedFields);
    });

    it('given a state where none of fields a, b and c compare to field d, then findLinkedFields on field d returns an empty list', () => {
      state = state.setIn(['data', 'entities', 'fields', '3', 'name'], 'field-z');
      const linkedFields = findLinkedFields(state, 3);
      const expected = List([]);
      expect(expected).to.deep.equal(linkedFields);
    });
  });
});
