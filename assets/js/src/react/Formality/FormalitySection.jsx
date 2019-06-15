import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {List} from 'immutable';
import {FieldFactory} from './FieldFactory';

export const FormalitySection = props => {
  const title = props.section.get('title', false);
  const fields = props.section.get('fields', List([]));

  return <div className={'formality__section'}>
    {title ? <div className={'formality__section__title'}>{title}</div> : null}

    {fields.count() > 0 ? <div className={'formality__section__fields'}>
      {fields.valueSeq().map((field, index) => <FieldFactory field={field} key={field.get('id', `${props.index}${index}`)}/>)}
    </div> : null}
  </div>;
};

FormalitySection.propTypes = {
  section: ImmutablePropTypes.map.isRequired
};
