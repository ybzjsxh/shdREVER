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
          width: 150,
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
          width: 160,
          render: function(data){
            return <Tag type="primary">{data.name}</Tag>
          }
        },
        {
          label: "操作",
          prop: "address",
          render: function(){
            return (
              <span>
                <Button type="danger"><Icon name="delete2"/> 关闭此设备</Button>
                <Button type="success"><Icon name="close"/> 清除此IP</Button>
              </span>
            )
          }
        }
      ],
      data: [{
        ip: '192.168.0.1',
        name: 'xxx',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
       }]
    }
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
        onCurrentChange={item=>{console.log(item)}}
      />
    )
  }
}