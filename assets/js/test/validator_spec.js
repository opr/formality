import {expect} from 'chai';
import {Map, List} from 'immutable';
import {
    generateValidationFunction, generateValidationMessages, validateEmail, validateMaxLength,
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
        expect(generateValidationFunction(rules)(value).valid).to.equal(false);
        value = 'Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee ';
        expect(generateValidationFunction(rules)(value).valid).to.equal(true);
    });

    it('generates a function that validates maximum length', () => {
        let value = 'Coffee',
            rules = Map({
                maxLength: 50
            });
        expect(generateValidationFunction(rules)(value).valid).to.equal(true);
        value = 'Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee ';
        expect(generateValidationFunction(rules)(value).valid).to.equal(false);
    });

    it('generates a function that validates an email', () => {
        let value = 'ghosts@spooky.com',
            rules = Map({
                type: 'email'
            });
        expect(generateValidationFunction(rules)(value).valid).to.equal(true);
    });

    it('generates a function that does not validate an email', () => {
        let value = 'Coffee',
            rules = Map({
                type: 'email'
            });
        expect(generateValidationFunction(rules)(value).valid).to.equal(false);
    });

    it('generates a function that does not validate a regex', () => {
        let value = 'test string not right',
            rules = Map({
                regex: /^hello$/
            });
        expect(generateValidationFunction(rules)(value).valid).to.equal(false);
    });

    it('generates a function that validates a a regex', () => {
        let value = 'hello',
            rules = Map({
                regex: /^hello$/
            }),
            result = generateValidationFunction(rules)(value);
        expect(result.valid).to.equal(true);
    });

    it('generates a function that handles a list of maps', () => {
        let value = 'hello',
            rules = List([
                Map({
                    regex: /^hello$/
                })]),
            result = generateValidationFunction(rules)(value);
        expect(result.valid).to.equal(true);
    });

    it('generates a function that handles a list of maps and returns the failing rule', () => {
        let value = 'hello',
            rules = List([
                Map({
                    regex: /^hello$/
                }),
                Map({
                    minLength: 500
                })]),
            result = generateValidationFunction(rules)(value);
        expect(result.valid).to.equal(false);
        expect(result.invalidRule).to.equal(1);
    });

    it('generates the correct list of validation messages', () => {
        const rules = List([
            Map({
                regex: /^hello$/,
                validationMessage: 'Invalid value'
            }),
            Map({
                minLength: 500,
                validationMessage: 'Too short'
            })]);
        expect(generateValidationMessages(rules)).to.contain('Too short');
        expect(generateValidationMessages(rules)).to.contain('Invalid value');
    });
});