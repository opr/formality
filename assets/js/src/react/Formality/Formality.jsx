import React, {useEffect} from 'react';
import {FormalityPagination} from './FormalityPagination';
import {Provider} from 'react-redux';
import makeStore from '../redux-config/store';
import {Map} from 'immutable';
import {setUpInitialState} from './core';
import {FormalityPage} from './FormalityPage';

export const Formality = props => {
  return <Provider store={makeStore(props.config)}>
    <div className={'formality'}>
      <div className={'formality__inner'}>
        <FormalityPagination/>
        <FormalityPage />
      </div>
    </div>
  </Provider>;
};
