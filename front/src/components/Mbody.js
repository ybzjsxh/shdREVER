import React, { Component } from 'react'

import {Button, Icon, Table, Tag} from 'element-react'

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
          render: function(){
            return (
              <span>
                <Button type="danger" size="small" onClick={this.closeDevice}><Icon name="delete2"/> 关闭此设备</Button>
                <Button type="success" size="small"><Icon name="close"/> 清除此IP</Button>
              </span>
            )
          }
        }
      ],
      data: {
        device:[
          {
            ip: '192.168.0.1',
            name: 'xxx'
          }
        ]
      }
    }

    this.closeDevice = this.closeDevice.bind(this)
  }

  closeDevice(e) {
    console.log(e)
    this.setState({data: {}})
    console.log('ddd')
  }

  render() {
    return (
      <Table
        style={{width: '100%'}}
        columns={this.state.columns}
        data={this.state.data.device}
        border={true}
        height={250}
        highlightCurrentRow={true}
        onCurrentChange={this.closeDevice}
      />
    )
  }
}