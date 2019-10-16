import React from 'react';
import { connect } from 'dva';
import { Table, Button, Tag, Modal, Icon, message, Tooltip } from 'antd';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';

@connect(({ device, loading }) => ({
  device,
  loading: loading.global,
}))
class Content extends React.Component {
  dataSource = [
    // {
    //   key: 'name',
    //   name: 'ddd',
    //   ip: '1.1.1.1',
    //   mac: '1.1.1.1',
    //   close: false
    // },
    // {
    //   key: 'name',
    //   name: 'dddd',
    //   ip: '1.1.1.2',
    //   mac: '1.1.1.2',
    //   close: true
    // },
  ];
  columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100,
      fixed: 'left',
      filters: [{ text: '在线', value: false }, { text: '离线', value: true }],
      onFilter: (value, record) => record.close === value,
      render: (text, record) => <Tag color="#2db7f5">{text}</Tag>,
    },
    {
      title: '设备ip',
      dataIndex: 'ip',
      key: 'ip',
      align: 'center',
      width: 150,
    },
    {
      title: '设备mac',
      dataIndex: 'mac',
      key: 'mac',
      align: 'center',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (text, record) => (
        <span>
          {record.close ? (
            <Tooltip title='暂未开发，敬请期待~' trigger='click'>
              <Button
                type="primary"
                style={{ margin: '0 10px 10px 0' }}
                onClick={() => this.awakeDevice()}
                disabled
              >
                开启设备
              </Button>
            </Tooltip>
          ) : (
            <Button
              type="danger"
              style={{ margin: '0 10px 10px 0' }}
              onClick={() => this.closeDevice(record.name, record.ip, record.sid)}
            >
              关闭设备
            </Button>
          )}
          <Button
            type="danger"
            onClick={() => this.clearDevice(record.name, record.ip)}
            style={{ margin: '0 10px 10px 0' }}
          >
            清除设备
          </Button>
        </span>
      ),
    },
  ];

  componentDidMount() {
    this.getAllDevice = setInterval(() => {
      this.props.dispatch({ type: 'device/getAllDevice' });
    }, 3000);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this);
  //   if (this.props.device !== nextProps.device) {
  //     this.dataSource = nextProps.device.data;
  //   }
  // }

  // 不使用UNSAFE_componentWillReceiveProps更新
  componentDidUpdate(prevProps) {
    if (this.props.device !== prevProps.device) {
      this.dataSource = prevProps.device.data;
    }
  }

  componentWillUnmount() {
    clearInterval(this.getAllDevice);
  }

  awakeDevice = (name, ip) => {
    this.props.dispatch({ type: 'device/awakeDevice', payload: { name, ip } });
    message.success('操作成功！')
  };

  closeDevice = (name, ip, sid) => {
    this.props.dispatch({ type: 'device/closeDevice', payload: { name, ip, sid } });
    message.success('操作成功！')
  };

  clearDevice = (name, ip) => {
    let that = this;
    Modal.confirm({
      title: '确定清除这台设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        that.props.dispatch({ type: 'device/clearDevice', payload: { name, ip } });
        message.success('操作成功！')
      },
    });
  };

  render() {
    return (
      <div>
        <Table
          rowKey={record => record.ip}
          dataSource={this.props.device.data}
          columns={this.columns}
          pagination={false}
          locale={{ emptyText: '暂无设备连接' }}
          scroll={{ x: 120 }}
          loading={{
            spinning: this.props.loading,
            indicator: <Icon type="loading" />,
            size: 'large',
            tip: '正在加载数据...',
          }}
        />
      </div>
    );
  }
}

Content.propTypes = {
  data: PropTypes.string,
  columns: PropTypes.string
}

export default Content;
