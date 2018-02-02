import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag} from 'react-dom/test-utils';
import SuperForm from '../react/SuperForm/SuperForm';
import {expect} from 'chai';
import {formConfig} from './testForm';

describe('Super form', () => {
    it('renders a form tag onto the page when no formConfig property is supplied', () => {
        const superForm = renderIntoDocument(<SuperForm/>);

        const formTag = scryRenderedDOMComponentsWithTag(superForm, 'form');
        expect(formTag.length).to.equal(1);
    });

    it('renders a form tag and one input field with a label onto the page.', () => {
        const superForm = renderIntoDocument(<SuperForm formConfig={formConfig}/>);

        const formTag = scryRenderedDOMComponentsWithTag(superForm, 'form');
        expect(formTag[0].getAttribute('method')).to.equal(formConfig.method);
    });
});