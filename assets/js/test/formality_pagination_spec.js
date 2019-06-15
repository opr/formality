import {expect} from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import {List, Map} from 'immutable';
import React from 'react';
import {FormalityPagination} from '../src/react/Formality/FormalityPagination';
import {mount, shallow} from 'enzyme';
import {mockStore} from './test_helper';
import {Provider} from 'react-redux';

describe('Formality pagination', () => {
  const test = sinonTest(sinon);
  const store = mockStore(Map({pages: List([Map({}), Map({})])}));

  it('renders n divs where n is the number of pages on the form', () => {
    const mountedPagination = mount(<Provider store={store}><FormalityPagination/></Provider>);
    expect(mountedPagination.find('.formality__pagination__pager').length).to.equal(2);
  });
});
