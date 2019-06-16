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

  describe('setUpInitialState', () => {

    it('returns an immutable object if sent a normal JS object or an immutable map', test(function () {
      const config = Map({
        pages: List([
          Map({
            sections: List([
              Map({
                fields: List([
                  Map({
                    name: 'page1'
                  })
                ])
              })
            ])
          }),
          Map({
            sections: List([
              Map({
                fields: List([
                  Map({
                    name: 'page2'
                  })
                ])
              })
            ])
          }),
        ])
      });

      expect(isImmutable(setUpInitialState(config))).to.be.true;
      expect(isImmutable(setUpInitialState(config.toJS()))).to.be.true;
    }));

  });

});
