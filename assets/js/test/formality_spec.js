import React from 'react';
import {findDOMNode} from 'react-dom';
import Formality from '../react/Formality/Formality';
import FormPage from '../react/Formality/FormPage';
import {expect} from 'chai';
import {testForm} from "../react/Formality/Logic/testForm";
import {shallow, mount} from 'enzyme';

describe('Formality', () => {
    const formality = mount(<Formality formConfig={testForm} />);

    it('renders a form tag onto the page when no formConfig property is supplied', () => {
        let formality = mount(<Formality/>);
        expect(formality.find('form').length).to.equal(1);
        expect(findDOMNode(formality.instance()).querySelector('form').getAttribute('method')).to.equal('get');
        expect(findDOMNode(formality.instance()).querySelector('form').getAttribute('action')).to.equal('/');
    });

    it('renders a form tag with the correct attributes as per the config.', () => {
        expect(findDOMNode(formality.instance()).querySelector('form').getAttribute('method')).to.equal(testForm.formMethod);
        expect(findDOMNode(formality.instance()).querySelector('form').getAttribute('action')).to.equal(testForm.formAction);
    });

    it('renders a "FormPage"', () => {
        expect(formality.find(FormPage)).to.have.length(1);
    });
});