import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './views/Login'
import Main from './views/Main'

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
        <Redirect to="/"/>
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
