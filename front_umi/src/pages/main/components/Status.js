import React from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Statistic } from 'antd';
import PropTypes from 'prop-types';

import GlobalOperation from './GlobalOperation';

const Status = ({ awakeNum, closeNum, devNum }) => {
  return (
    <div>
      <span>
        <Row type="flex" justify="space-between" style={{ flexWrap: 'nowrap' }}>
          <Col style={{ alignSelf: 'center' }}>
            <GlobalOperation />
          </Col>
          <Col>
            <Row type="flex" style={{ flexWrap: 'nowrap' }}>
              <Col style={{ marginRight: 10 }}>
                <Statistic
                  title="在线"
                  value={awakeNum}
                  prefix={<Icon type="smile" theme="twoTone" twoToneColor="#52c41a" />}
                />
              </Col>
              <Col style={{ marginRight: 10 }}>
                <Statistic title="离线" value={closeNum} prefix={<Icon type="frown" />} />
              </Col>
              <Col>
                <Statistic
                  title="总共"
                  value={devNum}
                  prefix={<Icon type="pie-chart" theme="twoTone" />}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </span>
    </div>
  );
};

Status.propTypes = {
  awakeNum: PropTypes.number,
  closeNum: PropTypes.number,
  devNum: PropTypes.number
}

export default connect(state => {
  const { awakeNum, closeNum, devNum } = state.device.num;
  return {
    awakeNum,
    closeNum,
    devNum,
  };
})(Status);
