import React from 'react';

export default function Status (props) {
  return (
    <div>
      <span>设备列表</span>
      <span style={{float: "right", fontWeight: "bold"}}>当前连接设备：<span style={{color: "red", fontWeight: "bold"}}>{props.devNum}</span>台</span>
    </div>
  )
}