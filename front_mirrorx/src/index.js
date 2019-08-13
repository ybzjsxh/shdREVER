import React from 'react';
import mirror, { render, Router } from 'mirrorx';
import './node_modules/antd/dist/antd.css'
import App from './entry/App.js.js.js'
import './index.css';
import './state';
mirror.defaults({
  historyMode: 'hash'
})

render(<Router><App /></Router>, document.getElementById('root'));
