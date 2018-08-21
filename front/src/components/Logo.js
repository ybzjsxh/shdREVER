import React, { Component } from 'react'
import logo from '../header.svg'

class Logo extends Component {
  render() {
    return (
      <div style={{textAlign:"center"}}>
        <img src={logo} style={{width:96}} alt='无法加载'/>
      </div>
    )
  }
}

export default Logo