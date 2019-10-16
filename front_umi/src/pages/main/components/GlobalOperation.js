import React from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { connect } from 'dva';

const GlobalOperation = props => {
  const closeAll = () => {
    Modal.confirm({
      title: '确定关闭所有设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        props.dispatch({ type: 'device/closeAll' });
        message.success('操作成功！');
      },
    });
  };
  const awakeAll = () => {
    Modal.confirm({
      title: '确定开启所有设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        props.dispatch({ type: 'device/awakeAll' });
        message.success('操作成功！');
      },
    });
  };

  return (
    <div>
      <Button
       type="danger"
       icon="poweroff"
       onClick={closeAll}
       style={{ margin: '0 10px 10px 0' }}
       >
        关闭所有设备
      </Button>
      <Tooltip title="暂未开发，敬请期待~" placement="right" trigger='click'>
        <Button
          type="danger"
          icon="exclamation-circle"
          onClick={awakeAll}
          style={{ margin: '0 10px 10px 0' }}
          disabled
        >
          开启所有设备
        </Button>
      </Tooltip>
    </div>
  );
};

export default connect(state => {
  return {
    device: state.device,
  };
})(GlobalOperation);
