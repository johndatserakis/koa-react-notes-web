import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from 'App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(`<BrowserRouter><Switch> <App /> </Switch><BrowserRouter/>`, div);
  ReactDOM.unmountComponentAtNode(div);
});