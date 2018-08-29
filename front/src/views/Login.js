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
      err1: false, // 密码错误
      err2: false, // 密码为空
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
            // window.location.href = 'http://localhost:8888/'
            this.props.history.push('/main')
          } else {
            this.setState({err1: true})
            setTimeout(() => {
              this.setState({err1: false})
            }, 3000)
          }
        })
        .catch(error => {
          console.log(error.message);
        })
    } else {
      this.setState({err2: true})
      setTimeout(() => {
        this.setState({err2: false})
      }, 3000)
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
            <Layout.Col span="12" xs="22" md="12" lg="10">
              {this.state.err1
                ? <Alert title="密码错误" type="error" showIcon={true} onClose={()=>this.setState({err1: false})} closeText="晓得了:("/>
                : null}
              {this.state.err2
                ? <Alert title="请输入密码" type="error" showIcon={true} onClose={()=>this.setState({err2: false})} closeText="晓得了:("/>
                : null}
              <Form.Item label="请登录" labelPosition="right" prop="pass">
                <Input type="password" onChange={this.onChange.bind(this, 'pass')} placeholder="请输入密码" autoComplete="off"/>
              </Form.Item>
            </Layout.Col>
          </Layout.Row>
          <Layout.Row type="flex" justify="center">
            <Layout.Col span="12" xs="22" md="12" lg="10">
            <Form.Item>
              <Button type="primary" size="large" style={{"width": "100%"}} onClick={this.handleSubmit.bind(this)}>登陆</Button>
            </Form.Item>
            </Layout.Col>
          </Layout.Row>
        </Form>
      </div>
    );
  }
}

export default Login;