import React, { Component } from 'react';

export default class Status extends Component {
  // constructor(props) {
  //   super(props)
  // }


  render() {
    return (
      <div>
        <span>设备列表</span>
        <span style={{float: "right",fontWeight: "bold"}}>当前连接设备：<span style={{color: "red",fontWeight:"bold"}}>{this.props.devNum}</span>台</span>
      </div>
    )
  }
}