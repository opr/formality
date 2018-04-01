import {isImmutable, Map, List, fromJS} from 'immutable';

export function validateEmail(email) {
  return email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null;
}

export function validateRegex(text, pattern) {
  //do the below because the jsonification of the rules screws things up a wee bit
  if (typeof pattern === 'string' || pattern instanceof String) {
    const fragments = pattern.match(/\/(.*?)\/([gimy])?$/);
    pattern = new RegExp(fragments[1], fragments[2] || ''); //rehydrates the regex
  }
  return text.match(pattern) !== null;
}

export function validateMinLength(str, length) {
  return str.length >= length;
}

export function validateMaxLength(str, length) {
  return str.length <= length;
}

export function generateValidationMessages(validation) {

  const defaultValidationMessage = 'Invalid value';
  let validationMessages = [];

  if (Map.isMap(validation)) {
    validation = List([validation]);
  }

  validation.map((e) => {
    validationMessages.push(e.get('validationMessage', defaultValidationMessage));
  });

  if (validationMessages.length === 0) {
    validationMessages = [defaultValidationMessage];
  }

  return List(validationMessages);
}

export function generateValidationFunction(rules, subscriptions = null) {

  if (typeof rules === 'string') {
    try {
      rules = JSON.parse(rules);
    }
    catch (e) {
      return {valid: true};
    }
  }

  if (!isImmutable(rules)) {
    rules = fromJS(rules);
  }

  if(!isImmutable(subscriptions)) {
    subscriptions = List();
  }

  return isImmutable(rules) ? (value, subscriptions = null) => {
    let valid,
      invalidRule = -1;

    if (Map.isMap(rules)) {
      rules = List([rules]);
    }

    for (let rule of rules.entries()) {
      const ruleNumber = rule[0];
      rule = rule[1];
      const maxLength = rule.get('maxLength', -1);
      valid = validateMinLength(value, rule.get('minLength', 0)) && ((maxLength === -1) || validateMaxLength(value, maxLength));
      if (rule.get('type') === 'email') {
        valid = valid && validateEmail(value);
      }
      if (rule.has('regex', '')) {
        valid = valid && validateRegex(value, rule.get('regex'));
      }
      if (rule.has('equalTo')) {
        try {
          if(typeof subscriptions !== 'object')
          subscriptions = fromJS(JSON.parse(subscriptions));
        }
        catch(e) {
          console.error(e);
        }

        if(!isImmutable(subscriptions)) {
          break;
        }

        if(subscriptions.count()) {
          for(let s of subscriptions.values()) {
            valid = valid && (s.get('value') === value);
          }
        }
      }
      if (!valid) {
        invalidRule = ruleNumber;
        break;
      }
    }
    return {valid, invalidRule}
  } : () => {
    return {valid: true} //return always valid if there are no rules
  };
}

export function getFieldNamesToSubscribeTo(field) {

  let subscriptions = field.get('validation', List([])),
    subscribedVariables = [];

  for (let e of subscriptions.values()) {
    if (isImmutable(e)) {
      if (Map.isMap(e)) {
        for (let c of e.entries()) {
          if (c[0] === 'equalTo' || c[0] === 'notEqualTo') {
            subscribedVariables.push(c[1]);
          }
        }
      }
    }
  }
  return subscribedVariables;
}

export function getSubscribedVariablesList(state, variables) {
  //console.log(state, variables);
  let variableList = [];
  for(let v of variables) {
    variableList.push({key: v, value: state.getIn(['variables', v])});
  }
  return variableList;
}

export function handleChange(name, value, that, subscriptions = null) {
  const validationResult = that.state.validationFunction(value, subscriptions);
  that.setState({
    value: value,
    dirty: true,
    valid: validationResult.valid,
    validationMessage: that.state.validationMessages.get(validationResult.invalidRule)
  });
  that.props.setValue(name, value);
  //that.props.setPageValidity(name, validationResult.valid);
}
