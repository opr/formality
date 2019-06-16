import React from 'react';
import {useSelector} from 'react-redux';
import {List} from 'immutable';

export const FormalityPagination = () => {
  const pageCount = useSelector(state => state.getIn(['data', 'entities', 'pages'], List([])).count());
  const currentPage = useSelector(state => state.get('currentPage', 0));

  return <div className={'formality__pagination'}>
    {[...Array(pageCount)].map((x, index) => <div key={index}
      className={`formality__pagination__pager${index === currentPage ? ' --active' : ''}`}>{index}</div>)}
  </div>;
};
