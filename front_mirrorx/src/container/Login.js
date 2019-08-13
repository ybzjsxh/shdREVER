import React from 'react';
import { connect } from 'mirrorx';
import { Row, Col, Input, Button, Form, message } from 'antd';
import axios from 'axios';
import md5 from 'md5';
// import { withCookies } from 'react-cookie';

import HeadAvatar from '../component/HeadAvatar'
// import { setCookie } from '../utils'

const Login = ({ cookies, form, history }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(props.form.getFieldValue(['password']).ssword);
    let pa = form.getFieldValue(['password']).ssword;
    form.validateFields((err, values) => {
      if(!err) {

      }
    })
    await axios.post('/login', {pass: md5(pa)})
                .then( res => {
                  if(res.data.code === 200){
                      // setCookie('pass', md5(pa))
                      // cookies.set('pass', md5(pa), {
                      //   maxAge: 24*60*60
                      // })
                      history.push('/main')
                      message.success('登陆成功')
                      return;
                  }
                  message.error(res.data.msg)
                })
                .catch(err=>{
                  message.error(err.message)
                  console.log(err.message);
                })
  }
  const { getFieldDecorator } = form;
  return (
    <div style={{border: '0px solid red',margin: '0 50px', padding: '0px 30px 80px', background: '#fff', borderRadius: 10, boxShadow: '20px 20px 30px #ddd'}}>
      <Row type="flex" justify="center" style={{marginTop:'50px'}}>
        <Col xs={24} sm={18} md={12} lg={12} xl={8}>
          <HeadAvatar></HeadAvatar>
        </Col>
      </Row>
      <Row type="flex" justify="center" >
        <Col xs={24} sm={18} md={12} lg={12} xl={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: '是否忘记输入密码'}],
              })(
                <Input.Password placeholder="请输入密码" style={{marginTop:'20px'}} />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block style={{marginTop:'10px'}}>登陆</Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
    </div>
  )
}

var WrappedLogin = Form.create({ name: 'login' })(Login)


export default connect(state => {
  return {

  }
})(WrappedLogin)
