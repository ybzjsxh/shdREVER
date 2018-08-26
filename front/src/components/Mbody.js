import React, { Component } from 'react'

import {Button, Icon, Table, Tag} from 'element-react'
import axios from 'axios';

export default class Mbody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          type: 'index'
        },
        {
          label: "设备IP",
          prop: "ip",
          // width: 120,
          render: function(data){
            return (
              <span>
                <Icon name="share"/>
                <span style={{marginLeft: '10px'}}>{data.ip}</span>
              </span>
            )
          }
        },
        {
          label: "设备名称",
          prop: "name",
          // width: 80,
          render: function(data){
            return <Tag type="primary">{data.name}</Tag>
          }
        },
        {
          label: "操作",
          prop: "execution",
          render: (row, column, index) => {
            return (
              <span>
                <Button type="danger" size="small" loading={false} onClick={this.closeDevice.bind(this, index)}><Icon name="delete2"/> 关闭此设备</Button>
                <Button type="success" size="small" onClick={this.clearDevice.bind(this, index)}><Icon name="close"/> 清除此IP</Button>
              </span>
            )
          }
        }
      ],
      data: [
          // {
          //   ip: '192.168.0.1',
          //   name: 'xxx'
          // },
          // {
          //   ip: '192.168.0.1',
          //   name: 'xxx'
          // }
      ]
    }

  }

  closeDevice(index) {
    this.state.data.splice(index, 1)
    axios.get('/closeDevice', {
      params: {
        index: index
      }
    })
      .then(res=>{
        this.setState({data: [...this.state.data]})
      })
      .catch(error => {
        console.log(error.message)
        alert('请求出错！')
      })
  }

  clearDevice(index) {
    // console.log(index)
    this.state.data.splice(index, 1)
    this.setState({data: [...this.state.data]})
  }

  componentDidMount() {
    this.getAllDevice = setInterval(() => {
      axios.get('/getAllDevice')
        .then(res => {
          // console.log(res.data);
          this.setState({data: Object.assign([], res.data)})
          console.log(this.state.data)
        })
        .catch(err => {
          console.log(err.message);
        })
    }, 5000)
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
        height={250}
        highlightCurrentRow={true}
        stripe={true}
        emptyText={'无设备连接'}
      />
    )
  }
}