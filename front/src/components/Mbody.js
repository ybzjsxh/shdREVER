import React, { Component } from 'react'

import {Button, Icon, Table, Tag, Message, Notification} from 'element-react'
import axios from 'axios';
// import '../mock'

import { getCloseNum } from "../utils";

import NProgress from 'nprogress'

export default class Mbody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      close: true,  // 是否关机
      columns: [
        {
          type: 'index',
          fixed: 'left'
        },
        {
          label: "设备名称",
          prop: "name",
          align: "center",
          width: 220,
          render: function(data){
            return <Tag type="primary">{data.name}</Tag>
          }
        },
        {
          label: "设备IP",
          prop: "ip",
          align: "center",
          width: 180,
          render: function(data){
            return (
              <span>
                <Icon name="share"/>
                <span style={{marginLeft: '5px'}}>{data.ip}</span>
              </span>
            )
          }
        },
        {
          label: "Mac地址",
          prop: "mac",
          align: "center",
          width: 200,
          render: function(data) {
            return (
              <span>
                <Icon name="search"/>
                <span style={{marginLeft: '2px'}}>{data.mac}</span>
              </span>
            )
          }
        },
        {
          label: "操作",
          prop: "execution",
          width: 400,
          render: (row, column, index) => {
            return (
              <span>
                {
                  row.close
                    ? <Button type="danger" size="small" disabled={this.state.close} loading={this.state.loading} onClick={this.closeDevice.bind(this, row.ip, row.name)}><Icon name="delete2"/> 关闭此设备</Button>
                    : <Button type="danger" size="small" disabled={!this.state.close} loading={this.state.loading} onClick={this.closeDevice.bind(this, row.ip, row.name)}><Icon name="delete2"/> 关闭此设备</Button>
                }
                {
                  row.close
                    ? <Button type="success" size="small" disabled={!this.state.close} loading={this.state.loading} onClick={this.wakeDevice.bind(this, row.ip, row.name, row.mac)}><Icon name="circle-check"/> 开启此设备</Button>
                    : <Button type="success" size="small" disabled={this.state.close} loading={this.state.loading} onClick={this.wakeDevice.bind(this, row.ip, row.name, row.mac)}><Icon name="circle-check"/> 开启此设备</Button>
                }
                <Button type="danger" size="small" plain={true} loading={this.state.loading} onClick={this.clearDevice.bind(this, row.ip, row.name)}><Icon name="warning"/> 清除此IP</Button>
              </span>
            )
          }
        }
      ],
      data: [
          // {
          //   ip: '192.168.0.1',
          //   name: 'xxx'
          // }
      ]
    }

  }

  closeDevice(ip, name) {
    // this.state.data.splice(index, 1);
    axios.get('/closeDevice', {
      params: {
        ip,
        name
      }
    })
      .then(() => {
        this.setState({loading: true, data: [{...this.state.data}]});
        setTimeout(() => {
          this.setState({loading: false});
        }, 500)
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '请求失败！'
        });
        console.log(err.message);
      })
  }

  clearDevice(ip, name) {
    axios.get('/clearDevice', {
      params: {
        ip,
        name
      }
    })
      .then(() => {
        this.setState({loading: true, data: [...this.state.data]});
        setTimeout(() => {
          this.setState({loading: false});
        }, 500)
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '请求失败！'
        });
        console.log(err.message);
      })
  }

  wakeDevice(ip, name, mac) {
    axios.get('/wakeDevice', {
      params: {
        ip,
        name,
        mac
      }
    })
      .then(e => {
        console.log(e.data);
        if(e.data.code !== 500){
          this.setState({loading: true});
          setTimeout(() => {
            this.setState({loading: false});
          }, 500)
        }
        Message({
          type: 'error',
          message: e.data.msg
        })
      })
      .catch(err => {
        Message({
          type: 'error',
          message: '请求失败！'
        });
        console.log(err.message);
      })
  }

  componentWillMount() {
    NProgress.start()
  }

  componentDidMount() {
    this.getAllDevice = setInterval(() => {
      axios.get('/getAllDevice', {
        timeout: 500
      })
        .then(res => {
          // console.log(res.data, this.props);
          let data = res.data.data;
          // console.log(data);
          this.setState({data: Object.assign([], data)});
          this.props.setDevNum(data.length);
          this.props.setCloseNum(getCloseNum(data).closeNum);
          this.props.setAwakeNum(getCloseNum(data).awakeNum);
          // console.log(this.state.data);
          NProgress.done()
        })
        .catch(err => {
          Notification({
            title: '警告',
            message: '连接似乎异常！',
            type: 'warning',
            duration: 2000
          });
          console.log(err.message);
          NProgress.done()
        })
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.getAllDevice)
  }

  render() {
    return (
      <Table
        style={{width: '100%'}}
        columns={this.state.columns}
        data={this.state.data}
        border={true}
        // height={250} // 固定表头
        highlightCurrentRow={true}
        stripe={true}
        emptyText={'无设备连接'}
      />
    )
  }
}
