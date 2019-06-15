import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {TextField} from './Fields/TextField';

export const FieldFactory = props => {
  const field = props.field;
  switch(field.get('type', '')) {
    case 'text' :
      return <TextField field={field} />;
  }
  return <div>undefined field type</div>;
};

FieldFactory.propTypes = {
  field: ImmutablePropTypes.map.isRequired
};
