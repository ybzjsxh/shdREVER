import React, { Component } from 'react'
import Logo from '../components/Logo'
import './Login.css';

import axios from 'axios'


import {Button, Input, Form, Layout, Alert} from 'element-react'
import 'element-theme-default';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show1: false,
      dis1: 'none',
      show2: false,
      dis2: 'none',
      form: {
        pass: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.state.form.pass !== '') {
                // this.refs.form.validateField('pass');
                // console.log(this.refs.form)
              }
              callback();
            }
          } }
        ]
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.refs.form.validate((valid) => {
    //   if (valid) {
    //     alert('submit!');
    //   } else {
    //     console.log('error submit!!');
    //     return false;
    //   }
    // });
    if(this.state.form.pass !== '') {
      axios.post('/login', {
        pass: this.state.form.pass
      })
        .then(response => {
          console.log(response.data);
          if (response.data.code === 1) {
            console.log('logined')
            window.location.href = 'http://localhost:8888/'
          } else {
            this.setState({show1: true})
            this.state.show1 ? this.setState({dis1:"block"}):this.setState({dis1:"none"})
          }
        })
        .catch(error => {
          console.log(error.message);
        })
    } else {
      /*
      * TODO: 改成Alert
      * */
      alert('请输入密码！')
    }
  }
  //
  // handleReset(e) {
  //   e.preventDefault();
  //
  //   this.refs.form.resetFields();
  // }

  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  render() {
      return (
          <div className="container">
            <Logo/>
            <Form ref="form" model={this.state.form} rules={this.state.rules} className="ruleForm">
              <Layout.Row justify="center" type="flex">
                <Layout.Col span="12" xs="22" lg="12">
                  <Alert title="密码错误" type="error" showIcon={true} style={{display: this.state.dis1}} onClose={()=>this.setState({show1:false,dis1:'none'})} closeText="晓得了:("/>
                  <Alert title="请输入密码" type="error" showIcon={true} style={{display: this.state.dis2}} onClose={()=>this.setState({show2:false,dis2:'none'})} closeText="晓得了:("/>
                  <Form.Item label="请登录" labelPosition="left" prop="pass">
                    <Input type="password" onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码" autoComplete="off"/>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row type="flex" justify="center">
                <Layout.Col xs="24" md="14" lg="14">
                <Form.Item>
                    <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>登陆</Button>
                    {/*<Button type="success" plain="true" size="large" onClick={this.handleReset.bind(this)}>重置</Button>*/}
                </Form.Item>
                </Layout.Col>
              </Layout.Row>
            </Form>
          </div>
      );
  }
}

export default Login;