import React from 'react';
import { Badge, Button } from 'element-react'

export default ({awakeNum, closeNum, devNum}) => {
  return (
    <div>
      <span>设备列表</span>
      {/*<span style={{float: "right", fontWeight: "bold"}}>当前连接设备：<span style={{color: "red", fontWeight: "bold"}}>{props.devNum}</span>台</span>*/}

      <span style={{float: "right", fontWeight: "bold"}}>
        <Badge value={awakeNum} style={{marginRight: 10}}>
          <Button size="mini" type="success">在线</Button>
        </Badge>
        <Badge value={closeNum} style={{marginRight: 10}}>
          <Button size="mini" type="danger" >离线</Button>
        </Badge>
        <Badge value={devNum}>
          <Button size="mini" type="info" >总台数</Button>
        </Badge>
      </span>
    </div>
  )
}
