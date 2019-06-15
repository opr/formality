import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {useDispatch} from 'react-redux';
import {changeFieldValue} from '../actions';

export const TextField = props => {
  const dispatch = useDispatch();

  const name = props.field.get('name', '');
  const label = props.field.get('label', name);
  const value = props.field.get('value', '');

  return <div className={'formality__field --text'}>
    <label className={'formality__field__label'}>{label}</label>
    <input type={'text'} name={name} value={value} onChange={e => dispatch(changeFieldValue(name, e.target.value))} />
  </div>;
};

TextField.propTypes = {
  field: ImmutablePropTypes.map.isRequired
};
