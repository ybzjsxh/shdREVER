import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter, Route } from 'react-router-dom';
import Login from './views/Login'
import Main from './views/Main'

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={Main} />
    </div>
  </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
