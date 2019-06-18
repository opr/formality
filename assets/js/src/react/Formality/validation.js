import {List, Map} from 'immutable';

export const isFieldValid = (state, key, value, validationOverride = null, callNumber = 0) => {

  //validation override can be passed to specify the validation object, used only when looping through a list of
  //validation criteria
  const validation = validationOverride === null
    ? state.getIn(['data', 'entities', 'fields', key.toString(), 'validation'], Map({}))
    : validationOverride;

  const fields = state.getIn(['data', 'entities', 'fields'], Map({}));

  if (validation.count() === 0) {
    //no validation specified so the field is always valid
    return true;
  }

  //user has set a list of validation criteria, so loop through them, validate each one as a standalone validation,
  //then .every them to see if they all passed. Will add an option later to set and/or behaviour on this, but not now.
  let invalidRule = -1;
  if (List.isList(validation)) {
    let call = 0;
    const v = Map({
      valid: validation.map(validationEntry => isFieldValid(state, key, value, validationEntry, call++))
        .every((x, index) => {
          if (!x) {
            invalidRule = index;
          }
          return x;
        }), invalidRule
    });
    console.log(v.toJS());
    return v;
  }

  if (validation.has('required')) {
    console.log('val r', (!!validation.get('required', false)), value, (value === '' || value === null || value === undefined));
    if ((!!validation.get('required', false)) && (value === '' || value === null || value === undefined)) {
      return false;
    }
  }

  //easiest and quickest thing to validate is length
  if (validation.get('length', 0) > value.length) {
    return false;
  }


  if (validation.has('regex') && typeof value === 'string') {
    return value.match(new RegExp(validation.get('regex'))) !== null;
  }

  if (validation.has('compareTo')) {

    console.log(validation, key);

    const compareName = validation.get('compareTo');
    const compareField = fields.find(field => field.get('name') === compareName);

    console.log(compareField, 'cf');

    if (compareField === undefined) {
      return true;
    }

    //we're going to be comparing strings, ints, floats, or anything else
    //so we should parse the input into that type, there's no real "parseString" method, so we made one up
    //to make it easier for us below (in the switch) otherwise we'd have a bunch of if statements and I didn't want that
    const parseString = s => s.toString();

    //the comparison will always be "new value compared to extant value" hence the below
    const leftCompareValue = value;
    const rightCompareValue = compareField.get('value', '');

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

    console.log(validation.get('compareOperator', '=='));
    //default value is ==, which we take to mean strict equality checking, might change later to == if enough users want it
    switch (validation.get('compareOperator', '==')) {
      case '==':
        return compareFunc(leftCompareValue) === compareFunc(rightCompareValue);
      case '!=':
        return compareFunc(leftCompareValue) !== compareFunc(rightCompareValue);
      case '>' :
        return compareFunc(leftCompareValue) > compareFunc(rightCompareValue);
      case '<' :
        return compareFunc(leftCompareValue) < compareFunc(rightCompareValue);
      case '>=' :
        return compareFunc(leftCompareValue) >= compareFunc(rightCompareValue);
      case '<=' :
        return compareFunc(leftCompareValue) <= compareFunc(rightCompareValue);
      case '||' :
        return !!(compareFunc(leftCompareValue) || compareFunc(rightCompareValue));
      case '&&' :
        return !!(compareFunc(leftCompareValue) && compareFunc(rightCompareValue));
      default:
        return compareFunc(leftCompareValue) === compareFunc(rightCompareValue);
    }
  }

  return true;
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
