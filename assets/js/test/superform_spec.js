import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-dom/test-utils';
import SuperForm from '../react/SuperForm/SuperForm';
import {expect} from 'chai';
import {testForm as formConfig} from './testForm';
import {shallow, mount} from 'enzyme'

describe('Super form', () => {
    it('renders a form tag onto the page when no formConfig property is supplied', () => {
        const superForm = shallow(<SuperForm />);
        expect(superForm.find('form').length).to.equal(1);
    });

    it('renders a form tag with the correct attributes onto the page.', () => {
        const superForm = mount(<SuperForm formConfig={formConfig} />);
        //console.log(superForm.html());
    });
});