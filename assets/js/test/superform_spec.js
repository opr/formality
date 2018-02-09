import React from 'react';
import {findDOMNode} from 'react-dom';
import SuperForm from '../react/SuperForm/SuperForm';
import FormPage from '../react/SuperForm/FormPage';
import {expect} from 'chai';
import {testForm} from "../react/SuperForm/Logic/testForm";
import {shallow, mount} from 'enzyme';

describe('Super form', () => {
    const superForm = mount(<SuperForm formConfig={testForm} />);

    it('renders a form tag onto the page when no formConfig property is supplied', () => {
        let superForm = mount(<SuperForm/>);
        expect(superForm.find('form').length).to.equal(1);
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('method')).to.equal('get');
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('action')).to.equal('/');
    });

    it('renders a form tag with the correct attributes as per the config.', () => {
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('method')).to.equal(testForm.formMethod);
        expect(findDOMNode(superForm.instance()).querySelector('form').getAttribute('action')).to.equal(testForm.formAction);
    });

    it('renders a "FormPage"', () => {
        expect(superForm.find(FormPage)).to.have.length(1);
    });
});