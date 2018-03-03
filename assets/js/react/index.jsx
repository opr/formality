import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Formality from './Formality/Formality';
import {testForm} from "./Formality/Logic/testForm";
import {whyDidYouUpdate} from 'why-did-you-update';
RegExp.prototype.toJSON = RegExp.prototype.toString;

const getRenderFunc = app => {
  return () => {
      render(app.component, app.element, app.name);
  }
};

if(process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
}

const render = (Component, element, name) => {
    ReactDOM.render(
        <AppContainer name={name}>
            {Component}
        </AppContainer>,
        element
    )
};

let apps = [
    {element: document.getElementById('formality-container'), component: <Formality formConfig={testForm}/>, file: './Formality/Formality', name: 'Formality'}
];

for (let a of apps) {
    a.element ? getRenderFunc(a)() : null;
    module.hot ? module.hot.accept(getRenderFunc(a)()) : null;
}
