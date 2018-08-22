import React, { Component } from 'react'
import Logo from '../components/Logo'
import './Login.css';

import axios from 'axios'


import {Button, Input, Form, Layout} from 'element-react'
import 'element-theme-default';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
                  if(value === "ytzt888555") {
                    console.log("PASSED!")
                  }
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
    axios.post('/login',{
      pass: this.state.form.pass
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.message);
    })
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
                <Layout.Col span="12" xs="24" lg="12">
                  <Form.Item label="请登录" prop="pass">
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