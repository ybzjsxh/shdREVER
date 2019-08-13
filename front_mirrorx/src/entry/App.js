import React from 'react';
import { withRouter, connect, Route, Redirect, Switch } from 'mirrorx';
import { withCookies } from 'react-cookie';
import { Login, Main } from '../container';

const App = ({ cookies }) => {
  return (
    <div>
      <Switch>
        <Route path="/" exact
          render={()=>(
            <Redirect to = "/login" />
          )} />
        <Route path="/login" component={Login} />
        {
          cookies.get('pass') === undefined
          ? <Redirect to='/login' />
          : <Route path="/main" component={Main} />
        }
        {/* <Route path="/main" component={Main} /> */}
      </Switch>
    </div>
  )
}

export default withRouter(connect(state => {
  return {
    // config: state.config
  }
})(withCookies(App)))
