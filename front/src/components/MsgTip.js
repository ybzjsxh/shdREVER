import React from 'react';

import './MsgTip.css'

export default function MsgTip (props) {
  return (
    <div className="header">
      <div className="msg-title">温馨提示：</div>
      <div className="msg-body" data-msg={props.msg}>{props.msg}</div>
    </div>
  )
}