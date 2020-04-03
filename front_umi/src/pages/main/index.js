import React from 'react';

import { Row, Col } from 'antd';
import MainHeader from './components/MainHeader';
import Status from './components/Status';
import Content from './components/Content';
import Redirect from 'umi/redirect'

class Main extends React.Component {
  componentWillUnmount() {
    sessionStorage.removeItem('shutdownToken');
  }

  render() {
    let token = sessionStorage.getItem('shutdownToken');
    return token ? (
      <div>
        <Row type="flex" justify="center" style={{ marginTop: '10px' }}>
          <Col xs={24} sm={24} md={18} lg={18} xl={12}>
            <MainHeader />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: '10px' }}>
          <Col xs={24} sm={24} md={18} lg={18} xl={16}>
            <Status />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: '10px' }}>
          <Col xs={24} sm={24} md={18} lg={18} xl={16}>
            <Content />
          </Col>
        </Row>
      </div>
    ) : (<Redirect to='/login' />)
  }
}

export default Main;
