import React from 'react';

import './MsgTip.css'

export default ({msg}) => {
  return (
    <div className="header">
      <div className="msg-title">温馨提示：</div>
      <div className="msg-body" data-msg={msg}>{msg}</div>
    </div>
  )
}
