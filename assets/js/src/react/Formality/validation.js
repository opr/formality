import {List, Map} from 'immutable';

export const isFieldValid = (state, key, value, validationOverride = null, callNumber = 0, overrideCompareCheckValue = null) => {

  //validation override can be passed to specify the validation object, used only when looping through a list of
  //validation criteria
  const validation = validationOverride === null
    ? state.getIn(['data', 'entities', 'fields', key.toString(), 'validation'], Map({}))
    : validationOverride;

  //this is an object containing each "rule" for validation, and true/false if it passes/fails.
  //by default all are true, so if no validation rules are on the field it is always valid.
  //when a field is checked, the key is changed here so at the end of the function, we can return the
  //result of the assertion that every key in here is true.

  const validationVariables = {
    required: true,
    length: true,
    regex: true,
    compareTo: true
  };


  const fields = state.getIn(['data', 'entities', 'fields'], Map({}));
  const isDirty = fields.getIn([key, 'dirty'], false);

  if (validation.count() === 0) {
    //no validation specified so the field is always valid
    return true;
  }

  //user has set a list of validation criteria, so loop through them, validate each one as a standalone validation,
  //then .every them to see if they all passed. Will add an option later to set and/or behaviour on this, but not now.
  let invalidRule = -1;
  if (List.isList(validation)) {
    let call = 0;
    return Map({
      valid: validation.map(validationEntry => isFieldValid(state, key, value, validationEntry, call++))
        .every((x, index) => {
          if (!x) {
            invalidRule = index;
          }
          return x;
        }), invalidRule
    });
  }

  if (validation.has('required')) {
    console.log('val r', (!!validation.get('required', false)), value, (value === '' || value === null || value === undefined));
    if ((!!validation.get('required', false)) && (value === '' || value === null || value === undefined)) {
      validationVariables.required = false;
    }
  }

  //easiest and quickest thing to validate is length
  if (value !== undefined && value !== null && validation.get('length', 0) > value.length) {
    validationVariables.length = false;
  }


  if (validation.has('regex') && typeof value === 'string') {
    validationVariables.regex = value.match(new RegExp(validation.get('regex'))) !== null;
  }

  if (validation.has('compareTo')) {
    const compareName = validation.get('compareTo');
    const compareField = fields.find(field => field.get('name') === compareName);

    if (!isDirty || (validation.has('compareOnlyIfDirty')
      && validation.get('compareOnlyIfDirty', false) === true
      && compareField.get('dirty', false) === false)) {
      validationVariables.compareTo = true;
    } else if (compareField === undefined) {
      validationVariables.compareTo = true;
    } else {
      //we're going to be comparing strings, ints, floats, or anything else
      //so we should parse the input into that type, there's no real "parseString" method, so we made one up
      //to make it easier for us below (in the switch) otherwise we'd have a bunch of if statements and I didn't want that
      const parseString = s => s.toString();

      //the comparison will always be "new value compared to extant value" hence the below
      const leftCompareValue = value;
      const rightCompareValue = overrideCompareCheckValue === null ? compareField.get('value', '') : overrideCompareCheckValue;

      //compareAs may not be defined, so in this case we'll just return the datum as it is passed in, hence compareFunc
      let compareAs = null;
      let compareFunc = x => x;

      //then if they have specified a comparison then we set it as per the compareAs
      if (validation.has('compareAs')) {
        compareAs = validation.get('compareAs');
      }

      if (compareAs === 'int') {
        compareFunc = parseInt;
      }

      if (compareAs === 'string') {
        compareFunc = parseString;
      }

      if (compareAs === 'float') {
        compareFunc = parseFloat;
      }

      //default value is ==, which we take to mean strict equality checking, might change later to == if enough users want it
      switch (validation.get('compareOperator', '==')) {
        case '==':
          validationVariables.compareTo = compareFunc(leftCompareValue) === compareFunc(rightCompareValue);
          break;
        case '!=':
          console.log('val', key, validation, value, 'compto', validationVariables, leftCompareValue, rightCompareValue);
          validationVariables.compareTo = compareFunc(leftCompareValue) !== compareFunc(rightCompareValue);
          console.log('val', key, validation, value, 'compto', validationVariables);
          break;
        case '>' :
          validationVariables.compareTo = compareFunc(leftCompareValue) > compareFunc(rightCompareValue);
          break;
        case '<' :
          validationVariables.compareTo = compareFunc(leftCompareValue) < compareFunc(rightCompareValue);
          break;
        case '>=' :
          validationVariables.compareTo = compareFunc(leftCompareValue) >= compareFunc(rightCompareValue);
          break;
        case '<=' :
          validationVariables.compareTo = compareFunc(leftCompareValue) <= compareFunc(rightCompareValue);
          break;
        case '||' :
          validationVariables.compareTo = !!(compareFunc(leftCompareValue) || compareFunc(rightCompareValue));
          break;
        case '&&' :
          validationVariables.compareTo = !!(compareFunc(leftCompareValue) && compareFunc(rightCompareValue));
          break;
        default:
          validationVariables.compareTo = compareFunc(leftCompareValue) === compareFunc(rightCompareValue);
          break;
      }

    }
  }

  return Object.values(validationVariables).every(x => x);
};


export const findLinkedFields = (state, currentField) => {
  const field = state.getIn(['data', 'entities', 'fields', currentField.toString()], Map({}));
  const fieldName = field.get('name', '');

  return state.getIn(['data', 'entities', 'fields'], Map({}))
    .filter(field => {
      if (!field.has('validation')) {
        return false;
      }
      const validation = field.get('validation', Map({}));

      if (List.isList(validation)) {
        return validation.filter(validationItem => validationItem.get('compareTo', null) === fieldName).count() > 0;
      }

      return validation.get('compareTo', null) === fieldName;
    }).map(x => x.get('id', -1)).toList();
};
