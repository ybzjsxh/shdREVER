import React, { Component } from 'react'
import Header from '../components/Header'
import Status from '../components/Status';
import Mbody from '../components/Mbody'

import axios from 'axios';
// import '../mock/mockdata'

import {Button, Icon, Layout, MessageBox, Message} from 'element-react'
import 'element-theme-default';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devNum: 0,
      data: props.data
    }
  }

  closeAll() {
    MessageBox.confirm("确定关闭所有设备吗？", "提示", {
      type: 'warning'
    })
      .then(() => {
        axios.get('/closeAll')
          .then(res => {
            this.setState({data: Object.assign({}, {device: [res.data]})});
            Message({
              type: 'success',
              message: '操作成功！'
            })
          })
          .catch(err => {
            console.log(err.message);
            Message({
              type: 'error',
              message: '服务异常！'
            })
          })
      })
      .catch(() => {
        Message({
          type: 'info',
          message: '已取消'
        })
      })
  }

  setDevNum = (devNum) => {
    this.setState({devNum: devNum})
  }

  render() {
    return (
      <div>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" md="16" lg="12">
            <Header />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" md="16" lg="12">
            <Button type="danger" size="large" onClick={this.closeAll.bind(this)} ><Icon name="warning"/> 关闭所有设备</Button>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" md="16" lg="12">
            <Status devNum={this.state.devNum}/>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="24" xs="24" md="16" lg="12">
            <Mbody setDevNum={this.setDevNum.bind(this)}/>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Main