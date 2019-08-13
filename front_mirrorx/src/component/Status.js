import React from 'react';
import { connect } from 'mirrorx';
import { Row, Col, Icon, Statistic } from 'antd';

import GlobalOperation from './GlobalOperation'

const Status = ({device}) => {
  return (
    <div>
      <span>
        <Row type="flex" justify="space-between" style={{flexWrap: 'nowrap'}} >
          <Col style={{alignSelf: 'center'}} >
            <GlobalOperation />
          </Col>
          <Col>
            <Row type="flex" style={{flexWrap: 'nowrap'}}>
              <Col style={{marginRight: 10}}>
                <Statistic title="在线" value={device.awakeNum} prefix={<Icon type="smile" theme="twoTone" twoToneColor="#52c41a" />} />
              </Col>
              <Col style={{marginRight: 10}}>
                <Statistic title="离线" value={device.closeNum} prefix={<Icon type="frown" />} />
              </Col>
              <Col>
                <Statistic title="总共" value={device.devNum} prefix={<Icon type="pie-chart" theme="twoTone" />} />
              </Col>
            </Row>
          </Col>
        </Row>
      </span>
    </div>
  )
}

export default connect(state => {
  return {
    device: state.device,
  }
})(Status)
