import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import md5 from 'md5';

import HeadAvatar from './components/HeadAvatar';

class Login extends React.Component {
  state = {
    show: false,
  };
  handleSubmit = async e => {
    e.preventDefault();
    // console.log(this.props.form.getFieldValue(['password']));
    let pa = this.props.form.getFieldValue(['password']).ssword;
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({ type: 'login/login', payload: { pass: md5(pa) } });
    });
  };

  owlFocus = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  owlBlur = () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          border: '0px solid red',
          margin: '0 50px',
          padding: '0px 30px 80px',
          background: '#fff',
          borderRadius: 10,
          boxShadow: '20px 20px 30px #ddd',
        }}
      >
        <Row type="flex" justify="center" style={{ marginTop: 80 }}>
          <Col xs={24} sm={18} md={12} lg={12} xl={8}>
            <HeadAvatar show={this.state.show} />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={24} sm={18} md={12} lg={12} xl={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '是否忘记输入密码' }],
                })(
                  <Input.Password
                    placeholder="请输入密码"
                    style={{ marginTop: '20px' }}
                    onFocus={this.owlFocus}
                    onBlur={this.owlBlur}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" block style={{ marginTop: '10px' }}>
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

var WrappedLogin = Form.create({ name: 'login' })(Login);

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  owl: PropTypes.bool,
};

export default connect()(WrappedLogin);
