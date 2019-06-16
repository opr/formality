import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {TextField} from './Fields/TextField';
import {Map} from 'immutable';
import {useSelector} from 'react-redux';

export const FieldFactory = React.memo(props => {
  const field = props.field;

  switch (field.get('type', '')) {
    case 'text' :
      return <TextField field={field}/>;
  }
  return <div>undefined field type</div>;
}, (a, b) => a.field.equals(b.field));

FieldFactory.propTypes = {
  field: ImmutablePropTypes.map.isRequired
};
