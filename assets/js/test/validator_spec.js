import {expect} from 'chai';
import {validateEmail} from "../react/Formality/Logic/validator";

describe('validator', () => {
   it('validates a valid email', () =>{
      expect(validateEmail('thomas@darwindigital.co')).to.equal(true);
   });

   it('does not validate an invalid email', () => {
       expect(validateEmail('my failing test')).to.equal(false);
   });
});