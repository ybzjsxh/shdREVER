import React, { Component } from 'react';

export default class Status extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devNum: 1
    }
  }
  render() {
    const devNum = this.state.devNum;
    return (
      <div>
        <span>设备列表</span>
        <span style={{float: "right"}}>当前连接设备：<font style={{color: "red",fontWeight:"bold"}}>{devNum}</font>台</span>
      </div>
    )
  }
}