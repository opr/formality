import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {List, Map} from 'immutable';
import {FormalitySection} from './FormalitySection';

export const FormalityPage = props => {
  const currentPageNumber = useSelector(state => state.get('currentPage', 0), shallowEqual);
  const currentPage = useSelector(state => state.getIn(['data', 'entities', 'pages', currentPageNumber.toString()]), Map({}), shallowEqual);
  const sections = useSelector(state => state.getIn(['data', 'entities', 'sections']), Map({}), shallowEqual)
    .filter(section => currentPage.get('sections', List([])).contains(section.get('id')));
  const pageName = useSelector(state => currentPage.get('name', false), shallowEqual);

  return <div className={'formality__page'}>
    {pageName ? <div className={'formality__page__title'}>{currentPage.get('name', '')}</div> : null}
    {sections.count() > 0 ?
    <div className={'formality__page__section-list'}>
      {sections.valueSeq().map((section, index) => <FormalitySection key={index} section={section} index={index} />)}
    </div> : null}
  </div>;
};
