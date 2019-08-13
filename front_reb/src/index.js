import React from 'react';
import mirror, { render, Router } from 'mirrorx';
import 'antd/dist/antd.css'
import App from './entry/App.js'
import './index.css';
import './state';
mirror.defaults({
  historyMode: 'hash'
})

render(<Router><App /></Router>, document.getElementById('root'));
