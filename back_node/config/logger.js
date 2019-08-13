const path = require('path');
const log4js = require('log4js');


log4js.configure({
  appenders: {
    net: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      filename: path.join(__dirname, '../logs/', 'net.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    net: { appenders: ['net'], level: 'info' }
  }
})

export const net = log4js.getLogger('net');
