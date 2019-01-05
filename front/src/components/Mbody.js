import React, { Component } from 'react'

import {Button, Icon, Table, Tag, Message, Notification} from 'element-react'
import axios from 'axios';
// import '../mock/mockdata'

import NProgress from 'nprogress'

export default class Mbody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      columns: [
        {
          type: 'index',
          fixed: 'left'
        },
        {
          label: "设备IP",
          prop: "ip",
          align: "center",
          width: 300,
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
          label: "设备名称",
          prop: "name",
          align: "center",
          width: 220,
          render: function(data){
            return <Tag type="primary">{data.name}</Tag>
          }
        },
        {
          label: "操作",
          prop: "execution",
          width: 400,
          render: (row, column, index) => {
            return (
              <span>
                <Button type="danger" size="small" loading={this.state.loading} onClick={this.closeDevice.bind(this, index)}><Icon name="delete2"/> 关闭此设备</Button>
                <Button type="success" size="small" plain={true} disabled={true} onClick={this.clearDevice.bind(this, index)}><Icon name="close"/> 清除此IP</Button>
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

  closeDevice(index) {
    this.state.data.splice(index, 1);
    axios.get('/closeDevice', {
      params: {
        index
      }
    })
      .then(res => {
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

  clearDevice(index) {
    this.state.data.splice(index, 1);
    this.setState({data: [...this.state.data]});
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
          // console.log(res.data);
          this.setState({data: Object.assign([], res.data)});
          this.props.setDevNum(res.data.length);
          console.log(this.state.data);
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