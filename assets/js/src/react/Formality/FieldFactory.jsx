import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {Map} from 'immutable';
import {useDispatch, useSelector} from 'react-redux';
import {changeFieldValue, setDirty} from './actions';
import {FormalityValidityLabel} from './FormalityValidityLabel';

export const FieldFactory = React.memo(props => {
  const dispatch = useDispatch();
  const field = props.field;
  let fieldToRender = <div>Invalid field type</div>;

  const name = field.get('name', '');
  const type = field.get('type', '');
  const label = field.get('label', name);
  const value = field.get('value', '');
  const numericId = field.get('id', -1);
  const valid = Map.isMap(field.get('valid', null)) ? field.getIn(['valid', 'valid'], true) : field.get('valid', true);
  const invalidValue = Map.isMap(field.get('valid', null))
    ? field.getIn(['validation', field.getIn(['valid', 'invalidRule'], 0), 'invalidMessage'], 'Invalid')
    : field.getIn(['validation', 'invalidMessage'], 'Invalid');

  const changeFunc = e => dispatch(changeFieldValue(numericId, e.target.value));

  switch (field.get('type', '')) {
    case 'text' :
    case 'password':
      fieldToRender = <input onBlur={e => {
        dispatch(setDirty(numericId));
        dispatch(changeFieldValue(numericId, e.target.value));
      }} id={numericId} type={type} name={name} value={value}
                             onChange={changeFunc}/>;
  }

  return <div className={`formality__field --${type}`}>
    <label htmlFor={numericId} className={'formality__field__label'}>{label}</label>
    {fieldToRender}
    <FormalityValidityLabel display={!valid} value={invalidValue}/>
  </div>;

}, (a, b) => a.field.equals(b.field));

FieldFactory.propTypes = {
  field: ImmutablePropTypes.map.isRequired
};
