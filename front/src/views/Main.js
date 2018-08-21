import React, { Component } from 'react'
import Header from '../components/Header'
import Status from '../components/Status';
import Mbody from '../components/Mbody'

import {Button, Icon, Layout} from 'element-react'
import 'element-theme-default';

class Main extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    return (
      <div>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" lg="12">
            <Header />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" lg="12">
            <Button type="danger" size="large"><Icon name="warning"/> 关闭所有设备</Button>
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" lg="12">
            <Status />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row justify="center" type="flex">
          <Layout.Col span="12" xs="24" lg="12">
            <Mbody />
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
}

export default Main