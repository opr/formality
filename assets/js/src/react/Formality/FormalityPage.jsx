import React from 'react';
import {useSelector} from 'react-redux';
import {Map} from 'immutable';
import {FormalitySection} from './FormalitySection';

export const FormalityPage = props => {
  const currentPageNumber = useSelector(state => state.get('currentPage', 0));
  const currentPage = useSelector(state => state.getIn(['pages', currentPageNumber]), Map({}));
  const sections = useSelector(state => state.getIn(['pages', currentPageNumber, 'sections']), Map({}));
  const pageName = useSelector(state => currentPage.get('name', false));

  return <div className={'formality__page'}>
    {pageName ? <div className={'formality__page__title'}>{currentPage.get('name', '')}</div> : null}
    {sections.count() > 0 ?
    <div className={'formality__page__section-list'}>
      {sections.valueSeq().map((section, index) => <FormalitySection key={index} section={section} index={index} />)}
    </div> : null}
  </div>;
};
