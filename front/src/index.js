import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Message } from 'element-react'
import Login from './views/Login'
import Main from './views/Main'

// import Nprogress from 'nprogress'
import '../node_modules/nprogress/nprogress.css'

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('req_token');
    if (token) {
      config.header.common['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    if (error.status === 401) {
      Message({
        type: 'error',
        message: error.response.msg
      }).then(() => {
        this.props.history.push('/login')
      })
    } else {
      Message({
        type: 'error',
        message: '系统异常！'
      })
    }
    return Promise.reject(error)
  }
)

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/main" component={Main} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
