import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Login from './views/Login'
// import Main from './views/Main'

ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
