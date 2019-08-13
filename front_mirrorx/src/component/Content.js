import React from 'react';
import { connect, actions } from 'mirrorx';
import axios from 'axios';
import { Table, Button, Tag, message, Modal, Icon } from 'antd';

import { getCloseNum } from '../utils';
// import io from 'socket.io-client';

class Content extends React.Component {
  dataSource = [
    // {
    //   key: 'name',
    //   name: 'ddd',
    //   ip: '1.1.1.1',
    //   mac: '1.1.1.1',
    //   close: false,
    //   sid: 'ZcYNBDUzby-yX-X_AAAB'
    // }
  ];
  columns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: 100,
      fixed: 'left',
      filters: [{text: '在线', value: 0},{text: '离线', value: 1}],
      onFilter: (value, record) => record.close === value,
      render: (text, record) => (
        <Tag color="#2db7f5">{text}</Tag>
      )
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
          {
            record.close
            ? (<Button type="primary" style={{margin: '0 10px 10px 0'}} onClick={()=>this.awakeDevice()} >开启设备</Button>)
            : (<Button type="danger" style={{margin: '0 10px 10px 0'}} onClick={()=>this.closeDevice(record.name, record.ip, record.sid)} >关闭设备</Button>)
          }
          <Button type="danger" onClick={()=>this.clearDevice(record.name, record.ip)} style={{margin: '0 10px 10px 0'}}>清除设备</Button>
        </span>
      )
    }
  ]

  componentDidMount() {
    // let socket = io('ws://localhost:3000')
    // socket.emit('getAllDevice')
    // actions.device.setSpinning({spinning: true})
    // socket.on('alld', data => {
    //   console.log(data);
    // })
    this.getAllDevice = setInterval(()=>{
      axios.get('/getAllDevice', {
        timeout: 500
      })
        .then(res=>{
          actions.device.setSpinning({spinning: false})
          let data = res.data.data;
          this.props.device.data = data;
          this.dataSource = Object.assign([], this.props.device.data)
          actions.device.setAwakeNum(getCloseNum(data).awakeNum);
          actions.device.setCloseNum(getCloseNum(data).closeNum);
          actions.device.setDevNum(data.length);
        })
        .catch(err=>console.log(err))
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.getAllDevice)
  }

  awakeDevice = () => {
    // TODO 待续
    console.log('awake')
  }

  closeDevice = (name, ip, sid) => {
    // this.setState({loading: true})
    console.log(this.props.device.spinning);
    actions.device.setSpinning({spinning:true})
    axios.get('/closeDevice', {
      params: {
        name,
        ip,
        sid
      }
    })
    .then(setTimeout(()=>actions.device.setSpinning({spinning:false})))
    // .then(setTimeout(()=>this.setState({loading: false}),5000))
    .catch(err=>message.error(err))
  }

  clearDevice = (name, ip) => {
    Modal.confirm({
      title: '确定清除这台设备吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        axios.get('/clearDevice', {
          params: {
            name,
            ip
          }
        })
        .then(()=>{
          actions.device.getAllDevice()
          message.success('清除成功')
        })
        .catch(err=>{
          message.error(err.message)
          console.log(err);
        })
      }
    })
  }

  render() {
    return (
      <div>
        {/* <Spin indicator={<Icon type="loading" />} spinning={this.props.device.spinning} tip="正在获取信息..." >
          <Table rowKey={record=>record.name} dataSource={this.dataSource} columns={this.columns} pagination={false} locale={{emptyText: '暂无设备连接'}} scroll={{x: 120}}  />
        </Spin> */}
        <Table
          rowKey={record=>record.ip}
          dataSource={this.dataSource}
          columns={this.columns}
          pagination={false}
          locale={{emptyText: '暂无设备连接'}}
          scroll={{x: 120}}
          loading={{
            spinning: this.props.device.spinning,
            indicator: <Icon type="loading" />,
            size: 'large',
            tip: '正在加载数据...'
          }}
        />
      </div>
    )
  }
}

export default connect(state=>{
  return {
    device: state.device
  }
})(Content)
