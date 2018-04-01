import React from 'react';
import TextField from './TextField';
import {Map, List, isImmutable} from 'immutable';
import SelectField from "./SelectField";
import {getFieldNamesToSubscribeTo} from './Logic/validator';

export default class FieldFactory {

  static shouldFieldBeShown(field, variables) {
    let display = true;
    if (field.has('displayRules')) {
      if (field.get('displayRules').has('hideByDefault')) {
        display = false;
      }

      for (const ruleSet of field.getIn(['displayRules', 'ruleSets'], []).values()) {
        if (ruleSet.has('conditions')) {
          //number of conditions
          for (const condition of ruleSet.get('conditions').values()) {

            const variableToCheck = condition.get('variable', null),
              compare = condition.get('compare', '='),
              valueToCheck = condition.get('value', true);
            switch (compare) {
              case '=' :
                display = variables.get(variableToCheck, null) === valueToCheck;
                break;
              case '!=' :
                display = variables.get(variableToCheck, null) !== valueToCheck;
                break;
              case '>' :
                display = variables.get(variableToCheck, null) > valueToCheck;
                break;
              case '>=' :
                display = variables.get(variableToCheck, null) >= valueToCheck;
                break;
              case '<' :
                display = variables.get(variableToCheck, null) < valueToCheck;
                break;
              case '<=' :
                display = variables.get(variableToCheck, null) <= valueToCheck;
                break;
              default:
                display = false;
            }
          }
        }
      }
    }
    return display;
  }

  static makeField(field, variables = null) {
    let inner = null,
      validation = JSON.stringify(field.get('validation', List([])).toJS()),
      subscriptions = JSON.stringify(getFieldNamesToSubscribeTo(field));

    //check if field should be shown
    if (!FieldFactory.shouldFieldBeShown(field, variables)) {
      return null;
    }

    switch (field.get('type')) {
      case 'text':
        inner =
          <TextField name={field.get('name')} key={field.get('name')}
                     label={field.get('label')}
                     type={'text'}
                     subscriptions={subscriptions}
                     validation={validation}
                     required={field.getIn(['validation', 'required'], false)}/>;
        break;
      case 'email':
        inner =
          <TextField name={field.get('name')} key={field.get('name')}
                     label={field.get('label')}
                     type={'email'}
                     subscriptions={subscriptions}
                     validation={validation}
                     required={field.getIn(['validation', 'required'], false)}/>;
        break;
      case 'password':
        inner =
          <TextField name={field.get('name')} key={field.get('name')}
                     label={field.get('label')}
                     type={'password'}
                     subscriptions={subscriptions}
                     validation={validation}
                     required={field.getIn(['validation', 'required'], false)}/>;
        break;
      case 'select':
        inner =
          <SelectField name={field.get('name')} key={field.get('name')}
                       label={field.get('label')}
                       subscriptions={subscriptions}
                       options={field.get('options')}
                       defaultValue={field.get('defaultValue', null)}
                       validation={validation}
                       required={field.getIn(['validation', 'required'], false)}/>;
        break;
      default :
        inner = null;
    }

    return (<div key={'form-row__' + field.get('name')} className={'form-row'}>{inner}</div>);
  }
}
