import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-dom/test-utils';
import SuperForm from '../react/SuperForm/SuperForm';
import {expect} from 'chai';
import {testForm as formConfig} from './testForm';
import {shallow, mount} from 'enzyme'

describe('Super form', () => {
    it('renders a form tag onto the page when no formConfig property is supplied', () => {
        const superForm = mount(<SuperForm />);
        expect(superForm.find('form').length).to.equal(1);
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('method')).to.equal('get');
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('action')).to.equal('/');
    });

    it('renders a form tag with the correct attributes as per the config.', () => {
        const superForm = mount(<SuperForm formConfig={formConfig} />);
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('method')).to.equal(formConfig.formMethod);
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('action')).to.equal(formConfig.formAction);
    });
});