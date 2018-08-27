import React, { Component } from 'react'
import Header from '../components/Header'
import Status from '../components/Status';
import Mbody from '../components/Mbody'

import axios from 'axios'

import {Button, Icon, Layout} from 'element-react'
import 'element-theme-default';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devNum: 0,
      data: props.data
    }
    this.setDevNum = this.setDevNum.bind(this)
  }

  closeAll() {
    axios.get('/closeAll')
      .then(res=>{
        this.setState({data: Object.assign({}, {device: [res.data]})});
      })
      .catch(error=>{
        console.log(error.message);
      })
  }

  setDevNum = (devNum)=>{
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
            <Button type="danger" size="large" onClick={this.closeAll.bind(this)}><Icon name="warning"/> 关闭所有设备</Button>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" md="16" lg="12">
            <Status devNum={this.state.devNum}/>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="24" xs="24" md="16" lg="12">
            <Mbody setDevNum={this.setDevNum}/>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Main