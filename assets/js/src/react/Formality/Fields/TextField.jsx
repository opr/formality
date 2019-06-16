import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {useDispatch} from 'react-redux';
import {changeFieldValue} from '../actions';

export const TextField = React.memo(props => {
  const dispatch = useDispatch();

  const name = props.field.get('name', '');
  const label = props.field.get('label', name);
  const value = props.field.get('value', '');
  const numericId = props.field.get('id', -1);

  return <div className={'formality__field --text'}>
    <label htmlFor={numericId} className={'formality__field__label'}>{label}</label>
    <input id={numericId} type={'text'} name={name} value={value}
           onChange={e => dispatch(changeFieldValue(numericId, e.target.value))}/>
  </div>;
}, (a, b) => a.field.equals(b.field));

TextField.propTypes = {
  field: ImmutablePropTypes.map.isRequired
};
