import {List, Map} from 'immutable';

export const isFieldValid = (state, key, value, validationOverride = null) => {
  const validation = validationOverride === null ? state.getIn(['data', 'entities', 'fields', key.toString(), 'validation'], Map({})) : validationOverride;
  const fields = state.getIn(['data', 'entities', 'fields'], Map({}));

  if (validation.count() === 0) {
    //no validation specified so the field is always valid
    return true;
  }

  if (List.isList(validation)) {
    return validation.map(validationEntry => isFieldValid(state, key, value, validationEntry)).every(x => x);
  }

  //easiest and quickest thing to validate is length
  if (validation.get('length', 0) > value.length) {
    return false;
  }

  if (validation.has('regex') && typeof value === 'string') {
    const regex = validation.get('regex');
    return value.match(new RegExp(regex)) !== null;
  }

  if (validation.has('compare')) {
    const compareName = validation.get('compare');
    const compareField = fields.find(field => field.get('name') === compareName);

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
