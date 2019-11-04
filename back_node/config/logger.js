const path = require('path');
const log4js = require('log4js');


log4js.configure({
  appenders: {
    net: {
      type: 'dateFile',
      pattern: 'yyMMdd',
      filename: path.join(__dirname, '../logs/', 'net.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info', backup: 7 },
    net: { appenders: ['net'], level: 'info', backup: 7 }
  }
})

export const net = log4js.getLogger('net');
