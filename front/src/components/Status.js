import React, { Component } from 'react';

export default class Status extends Component {
  constructor(props) {
    super(props)
    this.state = {
      devNum: props.devNum
    }
  }

  // shouldComponentUpdate(nextProp, nextState) {
  //   if(nextProp !== this.state.devNum) {
  //     return true
  //   }
  // }

  render() {
    const devNum = this.state.devNum;
    return (
      <div>
        <span>设备列表</span>
        <span style={{float: "right",fontWeight: "bold"}}>当前连接设备：<span style={{color: "red",fontWeight:"bold"}}>{devNum}</span>台</span>
      </div>
    )
  }
}