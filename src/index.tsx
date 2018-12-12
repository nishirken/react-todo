import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'sanitize.css';
import 'typeface-roboto';
import { App } from './app';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
