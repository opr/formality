import {expect} from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import {fromJS, isImmutable, List, Map} from 'immutable';
import React from 'react';
import {FormalityPagination} from '../src/react/Formality/FormalityPagination';
import {mount, shallow} from 'enzyme';
import {mockStore} from './test_helper';
import {Provider} from 'react-redux';
import {clearListOfSearchedItems, derivePathFromVariableName, setUpInitialState} from '../src/react/Formality/core';

describe('Formality core', () => {
  const test = sinonTest(sinon);
  const tree = fromJS({
    //this is a config area for various settings, the actual form config will appear further down

    //callback URL - when the form is submitted, this is the URL that the form is submitted to
    callbackUrl: '/my-api',

    //callback method - which verb to use when submitting the form
    callbackMethod: 'POST',

    //here we begin to define the form itself

    //an array of objects, of length one or greater. One object = one page.
    pages: [

      //page 1
      {
        name: 'Personal details',
        //you can give an array of extra classes to add to this page
        classes: ['extra-class-on-section'],

        //the page can have any nonzero, positive number of sections, which, like pages, is an array of objects
        sections: [

          {
            //each section has an optional name
            name: 'Address',
            classes: ['extra-class-on-section'],

            //the fields in the section, an array of objects
            fields: [
              {
                name: 'Address one',
                type: 'text'
              },
              {
                name: 'Address two',
                type: 'text',
                //you can give an array of classes to add to this field
                classes: ['extra-class-one']
              }
            ]
          },

          {
            //each section has an optional name
            name: 'Payment',
            classes: ['extra-class-on-section'],

            //the fields in the section, an array of objects
            fields: [
              {
                name: 'Card number',
                type: 'text'
              }
            ]
          }
        ]
      },
      {
        name: 'Company details',
        //you can give an array of extra classes to add to this page
        classes: ['extra-class-on-section'],

        //the page can have any nonzero, positive number of sections, which, like pages, is an array of objects
        sections: [

          {
            //each section has an optional name
            name: 'Address',
            classes: ['extra-class-on-section'],

            //the fields in the section, an array of objects
            fields: [
              {
                name: 'Company Address one',
                type: 'text'
              },
              {
                name: 'Company Address two',
                type: 'text',
                //you can give an array of classes to add to this field
                classes: ['extra-class-one']
              }
            ]
          },

          {
            //each section has an optional name
            name: 'Payment',
            classes: ['extra-class-on-section'],

            //the fields in the section, an array of objects
            fields: [
              {
                name: 'Company Card number',
                type: 'text'
              }
            ]
          }
        ]
      }
    ]
  });
  const store = mockStore(tree);
  const sandbox = sinon.createSandbox();

  describe('derivePathFromName', () => {

    afterEach(() => {
      clearListOfSearchedItems()
    });

    const test = sinonTest(sinon);
    it('gets the path to a field when given just the variable name', function () {
      const expectedPath = ['pages', 0, 'sections', 0, 'fields', 0, 'value'];;
      const secondExpectedPath = ['pages', 0, 'sections', 0, 'fields', 1, 'value'];;
      const thirdExpectedPath = ['pages', 1, 'sections', 0, 'fields', 1, 'value'];;
      expect(derivePathFromVariableName(tree, 'Address one')).to.deep.equal(expectedPath);
      expect(derivePathFromVariableName(tree, 'Address two')).to.deep.equal(secondExpectedPath);
      expect(derivePathFromVariableName(tree, 'Company Address two')).to.deep.equal(thirdExpectedPath);
    });


    it('does not search the entire tree if a search has already been done!', function () {
      const expectedPath = ['pages', 0, 'sections', 0, 'fields', 0, 'value'];
      global['memoizationTestFunc'] = () => expectedPath;
      const mock = sandbox.mock(global);
      mock.expects('memoizationTestFunc').once();
      console.log(global['memoizationTestFunc']);
      expect(derivePathFromVariableName(tree, 'Address one')).to.deep.equal(expectedPath);
      expect(derivePathFromVariableName(tree, 'Address one')).to.deep.equal(expectedPath);
      mock.verify();
    });


    it('throws if the key is not found', function () {
      const testFunctions = {derivePathFromVariableName};
      const spy = sandbox.spy(testFunctions, 'derivePathFromVariableName');
      try {
        testFunctions.derivePathFromVariableName(tree, 'fakefield');
      } catch (e) { /*not handling exception because I want it to happen! */
      }
      expect(spy.threw()).to.be.true;
    });
  });

  describe('setUpInitialState', () => {

    it('returns an immutable object if sent a normal JS object', test(function () {
      expect(isImmutable(setUpInitialState({myTest: true}))).to.be.true;
      expect(isImmutable(setUpInitialState(Map({myTest: true})))).to.be.true;
    }));

  });

});
