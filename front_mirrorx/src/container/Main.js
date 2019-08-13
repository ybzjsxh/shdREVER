import React from 'react'

import { Row, Col } from 'antd';
import MainHeader from '../component/MainHeader';
import Status from '../component/Status';
import Content from '../component/Content';

const Main = () => {
  return (
    <div>
      <Row type="flex" justify="center" style={{marginTop:'10px'}}>
        <Col xs={24} sm={24} md={18} lg={18} xl={12}>
          <MainHeader />
        </Col>
      </Row>
      <Row type="flex" justify="center" style={{marginTop:'10px'}}>
        <Col xs={24} sm={24} md={18} lg={18} xl={12}>
          <Status />
        </Col>
      </Row>
      <Row type="flex" justify="center" style={{marginTop:'10px'}}>
        <Col xs={24} sm={24} md={18} lg={18} xl={12}>
          <Content />
        </Col>
      </Row>
    </div>
  )
}

export default Main
