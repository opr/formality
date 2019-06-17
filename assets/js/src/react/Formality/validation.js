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
    const parseString = s => s.toString();
    const leftCompareValue = value;
    const rightCompareValue = compareField.get('value', '');
    let compareAs = null;
    let compareFunc = x => x;

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
