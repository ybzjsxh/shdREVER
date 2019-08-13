import React from 'react';
import { Button, message, Modal } from 'antd';
import { connect } from 'dva';
import axios from 'axios';

const GlobalOperation = () => {
  const closeAll = () => {
    Modal.confirm({
      title: '确定关闭所有设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        axios
          .get('/closeAll')
          .then(message.success('操作成功！'))
          .catch(err => console.log(err));
      },
    });
  };
  const awakeAll = () => {
    Modal.confirm({
      title: '确定开启所有设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        axios
          .get('/awakeAll')
          .then(message.success('操作成功！'))
          .catch(err => console.log(err));
      },
    });
  };

  return (
    <div>
      <Button
        type="danger"
        icon="exclamation-circle"
        onClick={closeAll}
        style={{ margin: '0 10px 10px 0' }}
      >
        关闭所有设备
      </Button>
      <Button
        type="danger"
        icon="exclamation-circle"
        onClick={awakeAll}
        style={{ margin: '0 10px 10px 0' }}
      >
        开启所有设备
      </Button>
    </div>
  );
};

export default connect(state => {
  return {
    device: state.device,
  };
})(GlobalOperation);
