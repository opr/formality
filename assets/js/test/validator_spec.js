import {expect} from 'chai';
import {Map} from 'immutable';
import {
    generateValidationFunction, validateEmail, validateMaxLength,
    validateMinLength
} from "../react/Formality/Logic/validator";

describe('validator', () => {
    it('validates a valid email', () => {
        expect(validateEmail('thomas@darwindigital.co')).to.equal(true);
    });

    it('does not validate an invalid email', () => {
        expect(validateEmail('my failing test')).to.equal(false);
    });

    it('validates a min length on a string', () => {
        expect(validateMinLength('sandwich', 5)).to.equal(true);
    });

    it('does not a min length on a string shorter than it', () => {
        expect(validateMinLength('sandwich', 500)).to.equal(false);
    });
    it('validates a max length on a string', () => {
        expect(validateMaxLength('sandwich', 500)).to.equal(true);
    });

    it('does not a max length on a string longer than it', () => {
        expect(validateMaxLength('sandwich', 5)).to.equal(false);
    });

    it('generates a function that validates minimum length', () => {
        let value = 'Coffee',
            rules = Map({
                minLength: 50
            });
        expect(generateValidationFunction(rules)(value)).to.equal(false);
        value = 'Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee ';
        expect(generateValidationFunction(rules)(value)).to.equal(true);
    });

    it('generates a function that validates maximum length', () => {
        let value = 'Coffee',
            rules = Map({
                maxLength: 50
            });
        expect(generateValidationFunction(rules)(value)).to.equal(true);
        value = 'Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee ';
        expect(generateValidationFunction(rules)(value)).to.equal(false);
    });

    it('generates a function that validates an email', () => {
        let value = 'ghosts@spooky.com',
            rules = Map({
                type: 'email'
            });
        expect(generateValidationFunction(rules)(value)).to.equal(true);
    });

    it('generates a function that does not validate an email', () => {
        let value = 'Coffee',
            rules = Map({
                type: 'email'
            });
        expect(generateValidationFunction(rules)(value)).to.equal(false);
    });
});