import React, {useEffect} from 'react';
import {FormalityPagination} from './FormalityPagination';

export const Formality = props => {
  useEffect(() => {
    //set up the initial state based on our props
    console.log('setting intial state :D');
  }, [props.config]);

  return <div className={'formality'}>
    <div className={'formality__inner'}>
      <FormalityPagination/>
    </div>
  </div>;
};
