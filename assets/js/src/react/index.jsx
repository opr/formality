import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {FormalityTest} from './FormalityTest/FormalityTest';

const getRenderFunc = app => {
  return () => {
    render(app.component, app.element, app.name, app.hydrate);
  };
};

const render = (Component, element, name, hydrate = false) => {
  const renderOrHydrate = hydrate ? ReactDOM.hydrate : ReactDOM.render;
  renderOrHydrate(
    <AppContainer name={name}>
      {Component}
    </AppContainer>,
    element
  );
};
const elements = {
  formalityTest: document.getElementsByClassName('formality-test__react-anchor')
};

const apps = [];

if (elements.formalityTest.length > 0) {
  apps.push(...Array.from(elements.formalityTest).map(element => ({
    element,
    component: <FormalityTest />,
    file: './FormalityTest/FormalityTest',
    name: 'FormalityTest'
  })));
}


for (const app of apps) {
  app.element ? getRenderFunc(app)() : null;
  module.hot ? module.hot.accept(getRenderFunc(app)()) : null;
}
