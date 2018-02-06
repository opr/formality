import {getFormAttributes} from "../react/SuperForm/Logic/formConfig";
import {testForm} from "./testForm";
import {expect} from 'chai';

describe('display logic', () => {
   it('gets the correct attributes for the form from a configuration object', () => {
      expect(getFormAttributes(testForm)).to.deep.equal({
          method: testForm.formMethod,
          action: testForm.formAction
      });
   });

   it('returns a default action when a config object is not present', () => {
       expect(getFormAttributes()).to.deep.equal({
           method: 'get',
           action: '/'
       });
   })
});