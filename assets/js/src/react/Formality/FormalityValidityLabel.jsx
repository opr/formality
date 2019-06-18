import React from 'react';
import {Map, List} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';

export const FormalityValidityLabel = props => {
  return props.display ?  <div>{props.value}</div> : null;
};

FormalityValidityLabel.propTypes = {
  value: PropTypes.string.isRequired
};
